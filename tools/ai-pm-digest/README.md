# AI + Product Management Digest

A personal filter that reads a curated list of AI and product-management
sources, keeps only what matches your interests, and emails you a short,
categorized digest every morning — Breaking News, Today's Updates, This
Week — with a one-line reason for each item.

Runs for free on a schedule via GitHub Actions. No servers, no paid APIs.

## How it works

1. `digest.py` fetches every RSS feed listed in `config.py`.
2. Entries published outside the last `LOOKBACK_HOURS` are dropped.
3. Each remaining entry is scored against the keyword list in
   `config.py` (`KEYWORDS`). Anything below `MIN_SCORE` is dropped.
4. Recent, high-scoring items (or anything from a "high" priority source
   published very recently) go into **Breaking News**. Everything else
   from the last 24h goes into **Today's Updates**; older matches land in
   **This Week**.
5. Each item gets a one-line "Why read this" built from which keyword
   topics it matched.
6. The digest is emailed as HTML via Gmail SMTP.

## One-time setup

### 1. Create a Gmail App Password

You need a Google account with 2-Step Verification on, then:

1. Go to https://myaccount.google.com/apppasswords
2. Create an app password (name it e.g. "ai-pm-digest").
3. Copy the 16-character password.

### 2. Add repository secrets

In this repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret       | Value                                          |
|--------------|-------------------------------------------------|
| `EMAIL_USER` | The Gmail address you generated the app password for |
| `EMAIL_PASS` | The 16-character app password from step 1      |
| `EMAIL_TO`   | (optional) Recipient address, defaults to `EMAIL_USER` |

### 3. Enable the workflow

The workflow at `.github/workflows/ai-pm-digest.yml` runs automatically
every day. You can also trigger it manually from the **Actions** tab
("Run workflow") to test it right away.

## Customizing

- **Sources**: edit `FEEDS` in `config.py` — add or remove RSS feeds, mark
  a source `"high"` priority if you want its posts to jump straight to
  Breaking News.
- **Interests**: edit `KEYWORDS` in `config.py` — add terms/weights under
  a topic, or add a new topic entirely. Higher weight = more relevant.
- **Timing/volume**: tune `LOOKBACK_HOURS`, `MIN_SCORE`, `BREAKING_SCORE`,
  `BREAKING_WINDOW_HOURS`, and `MAX_ITEMS` in `config.py`.
- **Schedule**: edit the `cron` line in the workflow file (times are UTC).

## Running locally

```bash
cd tools/ai-pm-digest
pip install -r requirements.txt
EMAIL_USER=you@gmail.com EMAIL_PASS=xxxxxxxxxxxxxxxx EMAIL_TO=you@gmail.com python digest.py
```
