"""Configuration for the AI + Product Management digest.

Edit FEEDS to add/remove sources, and KEYWORDS to tune what counts as
"relevant to me". No code changes needed elsewhere for either.
"""

# Each feed: (name, url, category, priority)
#   category: "ai" or "pm" - just used for labeling in the email
#   priority: "high" sources can trigger the "Breaking News" bucket on their
#             own even without a strong keyword match (e.g. official labs).
FEEDS = [
    # --- AI: official / primary sources ---
    ("OpenAI", "https://openai.com/news/rss.xml", "ai", "high"),
    ("Anthropic", "https://www.anthropic.com/rss.xml", "ai", "high"),
    ("Google AI Blog", "https://blog.google/technology/ai/rss/", "ai", "high"),
    ("Hugging Face", "https://huggingface.co/blog/feed.xml", "ai", "normal"),

    # --- AI: news / analysis ---
    ("TechCrunch AI", "https://techcrunch.com/tag/artificial-intelligence/feed/", "ai", "normal"),
    ("VentureBeat AI", "https://venturebeat.com/category/ai/feed/", "ai", "normal"),
    ("The Batch (DeepLearning.AI)", "https://www.deeplearning.ai/the-batch/feed/", "ai", "normal"),
    ("Simon Willison", "https://simonwillison.net/atom/everything/", "ai", "normal"),

    # --- Product Management ---
    ("Lenny's Newsletter", "https://www.lennysnewsletter.com/feed", "pm", "high"),
    ("SVPG (Marty Cagan)", "https://www.svpg.com/articles/feed/", "pm", "normal"),
    ("Mind the Product", "https://www.mindtheproduct.com/feed/", "pm", "normal"),
    ("First Round Review", "https://firstround.com/review/feed.xml", "pm", "normal"),
    ("a16z", "https://a16z.com/feed/", "pm", "normal"),
    ("Stratechery", "https://stratechery.com/feed/", "pm", "normal"),
]

# Keyword -> weight. Higher weight = more relevant to you. Matching is
# case-insensitive and checked against each entry's title + summary.
# Grouped into topics only so the "why read this" line can name the topic;
# grouping has no effect on scoring.
KEYWORDS = {
    "AI models & releases": {
        "gpt": 3, "claude": 3, "gemini": 3, "llama": 2, "mistral": 2,
        "llm": 2, "large language model": 2, "foundation model": 2,
        "model release": 3, "new model": 2, "benchmark": 1,
    },
    "AI agents & tools": {
        "agent": 2, "agentic": 2, "copilot": 2, "coding assistant": 2,
        "mcp": 2, "model context protocol": 2, "tool use": 1,
        "autonomous": 1,
    },
    "AI industry moves": {
        "acquisition": 3, "acquires": 3, "funding round": 3, "raises $": 3,
        "valuation": 2, "ipo": 2, "lawsuit": 2, "partnership": 1,
        "launch": 2, "announces": 2, "unveils": 2,
    },
    "Product management craft": {
        "product management": 3, "product manager": 2, "roadmap": 2,
        "prioritization": 2, "product strategy": 2, "product-market fit": 3,
        "user research": 2, "discovery": 1, "product sense": 1,
        "pm career": 2, "stakeholder": 1,
    },
    "Product & growth metrics": {
        "growth": 1, "retention": 2, "activation": 1, "north star metric": 2,
        "experimentation": 1, "a/b test": 1, "onboarding": 1,
    },
    "AI in product management": {
        "ai product": 3, "ai feature": 2, "ai pm": 3, "building with ai": 2,
        "genai": 2, "generative ai": 2,
    },
}

# Only consider entries published within this many hours of the run. Kept
# just above the ~12h gap between the two daily runs (7am/7pm) so the same
# item isn't emailed twice.
LOOKBACK_HOURS = 15

# Entries scoring below this are dropped entirely.
MIN_SCORE = 2

# Entries at/above this score, or from a "high" priority source, published
# within BREAKING_WINDOW_HOURS are promoted to "Breaking News".
BREAKING_SCORE = 5
BREAKING_WINDOW_HOURS = 10

# Cap on total items emailed (highest scoring first) to keep the digest short.
MAX_ITEMS = 20
