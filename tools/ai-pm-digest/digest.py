#!/usr/bin/env python3
"""Build and email a personal AI + Product Management digest.

Fetches the RSS feeds in config.py, keeps only recent entries that match
your interest keywords, scores and categorizes them (Breaking News /
Today's Updates / This Week), writes a one-line "why read this" for each,
and emails the result via Gmail SMTP.

Env vars required:
    EMAIL_USER  - Gmail address to send from
    EMAIL_PASS  - Gmail App Password (not your normal password)
    EMAIL_TO    - recipient address (defaults to EMAIL_USER if unset)
"""

import html
import os
import smtplib
import sys
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import parsedate_to_datetime

import feedparser

from config import (
    BREAKING_SCORE,
    BREAKING_WINDOW_HOURS,
    FEEDS,
    KEYWORDS,
    LOOKBACK_HOURS,
    MAX_ITEMS,
    MIN_SCORE,
)


def entry_published(entry):
    for field in ("published", "updated"):
        value = getattr(entry, field, None)
        if not value:
            continue
        try:
            dt = parsedate_to_datetime(value)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)
        except (TypeError, ValueError):
            continue
    return None


def score_entry(title, summary):
    text = f"{title} {summary}".lower()
    score = 0
    matched_topics = []
    for topic, terms in KEYWORDS.items():
        topic_hit = False
        for term, weight in terms.items():
            if term in text:
                score += weight
                topic_hit = True
        if topic_hit:
            matched_topics.append(topic)
    return score, matched_topics


def build_reason(matched_topics, source, priority):
    topics = ", ".join(matched_topics[:2]) if matched_topics else "your tracked topics"
    if priority == "high" and not matched_topics:
        return f"Straight from {source}, a primary source you follow closely."
    return f"Matches your interest in {topics} — flagged from {source}."


def fetch_items():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(hours=LOOKBACK_HOURS)
    items = []
    seen_links = set()

    for name, url, category, priority in FEEDS:
        try:
            parsed = feedparser.parse(url)
        except Exception as exc:  # noqa: BLE001 - a broken feed shouldn't kill the run
            print(f"[warn] failed to fetch {name} ({url}): {exc}", file=sys.stderr)
            continue

        for entry in parsed.entries:
            published = entry_published(entry)
            if published is None or published < cutoff:
                continue

            link = getattr(entry, "link", None)
            if not link or link in seen_links:
                continue

            title = getattr(entry, "title", "").strip()
            summary = getattr(entry, "summary", "") or getattr(entry, "description", "")
            score, matched_topics = score_entry(title, summary)

            if priority == "high":
                score += 1  # small nudge so primary sources surface more readily

            if score < MIN_SCORE:
                continue

            seen_links.add(link)
            age_hours = (now - published).total_seconds() / 3600
            is_breaking = age_hours <= BREAKING_WINDOW_HOURS and (
                score >= BREAKING_SCORE or priority == "high"
            )

            items.append(
                {
                    "title": title,
                    "link": link,
                    "source": name,
                    "category": category,
                    "priority": priority,
                    "published": published,
                    "score": score,
                    "reason": build_reason(matched_topics, name, priority),
                    "is_breaking": is_breaking,
                }
            )

    items.sort(key=lambda i: i["score"], reverse=True)
    return items[:MAX_ITEMS]


def bucketize(items):
    breaking = [i for i in items if i["is_breaking"]]
    today_cutoff = timedelta(hours=24)
    now = datetime.now(timezone.utc)
    today = [
        i for i in items
        if not i["is_breaking"] and (now - i["published"]) <= today_cutoff
    ]
    this_week = [i for i in items if not i["is_breaking"] and i not in today]
    return breaking, today, this_week


def render_section(title, emoji, items):
    if not items:
        return ""
    rows = []
    for item in items:
        rows.append(
            f"""
            <div style="padding:14px 0;border-bottom:1px solid #eee;">
              <a href="{html.escape(item['link'])}"
                 style="font-size:16px;font-weight:600;color:#111;text-decoration:none;">
                {html.escape(item['title'])}
              </a>
              <div style="font-size:13px;color:#888;margin-top:2px;">
                {html.escape(item['source'])} &middot; {item['category'].upper()}
              </div>
              <div style="font-size:14px;color:#444;margin-top:6px;">
                Why read this: {html.escape(item['reason'])}
              </div>
            </div>
            """
        )
    return f"""
    <h2 style="font-size:18px;margin:28px 0 4px;">{emoji} {html.escape(title)}</h2>
    {''.join(rows)}
    """


def render_email(breaking, today, this_week):
    date_str = datetime.now(timezone.utc).strftime("%A, %B %d %Y")
    body = (
        render_section("Breaking News", "\U0001F6A8", breaking)
        + render_section("Today's Updates", "\U0001F4F0", today)
        + render_section("This Week", "\U0001F5D3️", this_week)
    )
    if not body:
        body = """
        <p style="font-size:15px;color:#444;">
          Quiet day — nothing crossed your relevance bar in the last
          %d hours. Check back tomorrow.
        </p>
        """ % LOOKBACK_HOURS

    return f"""
    <html>
      <body style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;">
        <h1 style="font-size:22px;margin-bottom:0;">Your AI + PM Digest</h1>
        <div style="color:#888;font-size:13px;margin-bottom:8px;">{date_str}</div>
        {body}
        <hr style="margin-top:32px;border:none;border-top:1px solid #eee;">
        <div style="font-size:12px;color:#aaa;margin-top:12px;">
          Generated automatically from your tracked AI + PM sources. Tune
          sources and keywords in tools/ai-pm-digest/config.py.
        </div>
      </body>
    </html>
    """


def send_email(html_body, item_count):
    user = os.environ["EMAIL_USER"]
    password = os.environ["EMAIL_PASS"]
    to_addr = os.environ.get("EMAIL_TO", user)

    msg = MIMEMultipart("alternative")
    date_str = datetime.now(timezone.utc).strftime("%b %d")
    subject = f"AI + PM Digest — {date_str}"
    if item_count == 0:
        subject += " (quiet day)"
    msg["Subject"] = subject
    msg["From"] = user
    msg["To"] = to_addr
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(user, password)
        server.sendmail(user, [to_addr], msg.as_string())


def main():
    items = fetch_items()
    breaking, today, this_week = bucketize(items)
    html_body = render_email(breaking, today, this_week)
    send_email(html_body, len(items))
    print(
        f"Sent digest: {len(breaking)} breaking, {len(today)} today, "
        f"{len(this_week)} this week."
    )


if __name__ == "__main__":
    main()
