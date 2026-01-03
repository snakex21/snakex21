import os
import requests
from bs4 import BeautifulSoup
import json
import re

# Configuration
DB_FILE = "db/links.js"
URL = os.getenv("LINK_URL")

CATEGORIES = {
    "ai": ["ai", "gpt", "chatbot", "intelligence", "artificial", "llm", "sztuczna inteligencja", "machine learning"],
    "gry": ["game", "gry", "steam", "crack", "torrent", "emulator", "gaming", "play"],
    "programowanie": ["code", "programming", "github", "js", "python", "dev", "programowanie", "api", "web"],
    "filmy": ["movie", "film", "cinema", "serial", "video", "streaming", "netflix", "hbo"],
    "muzyka": ["music", "muzyka", "audio", "mp3", "sound", "bandcamp", "spotify"],
    "ebooki": ["ebook", "książka", "pdf", "libgen", "book", "read"],
    "komiksy": ["comic", "manga", "manhwa", "komiks"],
    "linux-macos": ["linux", "macos", "apple", "unix", "ubuntu"],
    "privacy": ["privacy", "vpn", "proxy", "security", "prywatność", "bezpieczeństwo"],
    "sport": ["sport", "football", "match", "pilka", "siatkówka"],
    "narzedzia-graficzne": ["graphic", "design", "photo", "editor", "grafika", "canvas", "svg"],
    "torrenty": ["torrent", "1337x", "pirate", "magnet"],
    "pobieranie": ["download", "pobierz", "direct"],
}

DEFAULT_CATEGORY = "pozostale"

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

def classify(title, description):
    text = (title + " " + description).lower()
    scores = {cat: sum(1 for kw in keywords if kw in text) for cat, keywords in CATEGORIES.items()}
    best_cat = max(scores, key=scores.get)
    return best_cat if scores[best_cat] > 0 else DEFAULT_CATEGORY

def load_db():
    if not os.path.exists(DB_FILE):
        return {"links": []}
    
    with open(DB_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract JSON from JS file
    match = re.search(r'const LINKHUB_DATA = ({[\s\S]*});', content)
    if match:
        try:
            return json.loads(match.group(1))
        except:
            return {"links": []}
    return {"links": []}

def save_db(data):
    js_content = f"// LinkHub Database - Auto-updated by AI\nconst LINKHUB_DATA = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
    with open(DB_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)

def update_db(category, name, url, description):
    data = load_db()
    
    new_link = {
        "name": name,
        "url": url,
        "category": category,
        "description": description[:150] + "..." if len(description) > 150 else description
    }
    
    # Avoid duplicates
    if any(l['url'] == url for l in data['links']):
        print(f"Link {url} already exists in DB.")
        return

    data["links"].insert(0, new_link)
    save_db(data)
    print(f"Added {name} to {category} in {DB_FILE}")

def main():
    if not URL:
        print("No URL provided.")
        return

    print(f"Processing URL: {URL}")
    title, description = scrape_metadata(URL)
    print(f"Found title: {title}")
    
    category = classify(title, description)
    print(f"Classified as: {category}")
    
    update_db(category, title, URL, description)

if __name__ == "__main__":
    main()
