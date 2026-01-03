import os
import requests
from bs4 import BeautifulSoup
import json
import re

# Configuration
DATA_FILE = "LinkHub/data.js"
URL = os.getenv("LINK_URL")
HF_TOKEN = os.getenv("HF_TOKEN")

# Hugging Face model
HF_MODEL = "zai-org/GLM-4.7"
HF_API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"

DEFAULT_CATEGORIES = {
    "ai": {"name": "🤖 AI", "color": "#8b5cf6"},
    "gry": {"name": "🎮 Gry", "color": "#ef4444"},
    "programowanie": {"name": "💻 Programowanie", "color": "#3b82f6"},
    "filmy": {"name": "🎬 Filmy", "color": "#f59e0b"},
    "muzyka": {"name": "🎵 Muzyka", "color": "#ec4899"},
    "ebooki": {"name": "📚 eBooki", "color": "#10b981"},
    "komiksy": {"name": "💥 Komiksy", "color": "#f97316"},
    "linux-macos": {"name": "🍎 Linux/macOS", "color": "#6366f1"},
    "privacy": {"name": "🛡️ Prywatność", "color": "#14b8a6"},
    "sport": {"name": "⚽ Sport", "color": "#22c55e"},
    "narzedzia-graficzne": {"name": "🎨 Grafika", "color": "#a855f7"},
    "torrenty": {"name": "🏴‍☠️ Torrenty", "color": "#64748b"},
    "pobieranie": {"name": "📥 Pobieranie", "color": "#0ea5e9"},
    "pozostale": {"name": "📦 Pozostałe", "color": "#78716c"}
}

def scrape_metadata(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        title = soup.title.string if soup.title else url
        description = ""
        meta_desc = soup.find("meta", attrs={"name": "description"})
        if meta_desc:
            description = meta_desc.get("content", "")
        else:
            meta_desc_og = soup.find("meta", attrs={"property": "og:description"})
            if meta_desc_og:
                description = meta_desc_og.get("content", "")
        
        return title.strip(), description.strip()
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return url, ""

def classify_with_ai(title, description):
    if not HF_TOKEN:
        print("No HF_TOKEN, using fallback.")
        return classify_fallback(title, description)
    
    categories = list(DEFAULT_CATEGORIES.keys())
    prompt = f"""<s>[INST] Classify this link into ONE category.
Categories: {', '.join(categories)}

Title: {title}
Description: {description[:300]}

Reply with ONLY the category name. [/INST]"""

    try:
        response = requests.post(HF_API_URL, 
            headers={"Authorization": f"Bearer {HF_TOKEN}"},
            json={"inputs": prompt, "parameters": {"max_new_tokens": 20, "temperature": 0.1}},
            timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                generated = result[0].get("generated_text", "").strip().lower()
                for cat in categories:
                    if cat in generated:
                        return cat
    except Exception as e:
        print(f"HF API error: {e}")
    
    return classify_fallback(title, description)

def classify_fallback(title, description):
    KEYWORDS = {
        "ai": ["ai", "gpt", "chatbot", "llm", "machine learning"],
        "gry": ["game", "gry", "steam", "gaming"],
        "programowanie": ["code", "programming", "github", "python", "dev"],
        "filmy": ["movie", "film", "serial", "streaming", "youtube", "video"],
        "muzyka": ["music", "muzyka", "audio", "spotify"],
        "ebooki": ["ebook", "książka", "pdf", "book"],
        "komiksy": ["comic", "manga"],
        "linux-macos": ["linux", "macos", "ubuntu"],
        "privacy": ["privacy", "vpn", "security"],
        "sport": ["sport", "football"],
        "narzedzia-graficzne": ["graphic", "design", "photo"],
        "torrenty": ["torrent", "pirate", "magnet"],
        "pobieranie": ["download", "pobierz"],
    }
    
    text = (title + " " + description).lower()
    scores = {cat: sum(1 for kw in kws if kw in text) for cat, kws in KEYWORDS.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "pozostale"

def load_data():
    if not os.path.exists(DATA_FILE):
        return DEFAULT_CATEGORIES.copy(), []
    
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Parse categories
    categories = DEFAULT_CATEGORIES.copy()
    cat_match = re.search(r'const LINKHUB_CATEGORIES = ({[\s\S]*?});', content)
    if cat_match:
        try:
            categories = json.loads(cat_match.group(1).replace("'", '"'))
        except:
            pass
    
    # Parse links
    links = []
    links_match = re.search(r'const LINKHUB_LINKS = (\[[\s\S]*?\]);', content)
    if links_match:
        try:
            links = json.loads(links_match.group(1))
        except:
            pass
    
    return categories, links

def save_data(categories, links):
    js = f"""// LinkHub Database - Auto-updated by AI
const LINKHUB_CATEGORIES = {json.dumps(categories, ensure_ascii=False, indent=2)};

const LINKHUB_LINKS = {json.dumps(links, ensure_ascii=False, indent=2)};
"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(js)

def main():
    if not URL:
        print("No URL provided.")
        return

    print(f"Processing: {URL}")
    title, description = scrape_metadata(URL)
    print(f"Title: {title}")
    
    category = classify_with_ai(title, description)
    print(f"Category: {category}")
    
    categories, links = load_data()
    
    # Don't add duplicates
    if any(l['url'] == URL for l in links):
        print("Link already exists.")
        return
    
    # Add new link at the beginning
    links.insert(0, {
        "name": title,
        "url": URL,
        "category": category,
        "description": description[:150] if description else ""
    })
    
    save_data(categories, links)
    print(f"Added to {DATA_FILE}")

if __name__ == "__main__":
    main()
