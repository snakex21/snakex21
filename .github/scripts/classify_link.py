import os
import requests
from bs4 import BeautifulSoup
import json
import re

# Configuration
DB_FILE = "db/links.js"
URL = os.getenv("LINK_URL")
HF_TOKEN = os.getenv("HF_TOKEN")

# Hugging Face model for classification
HF_MODEL = "zai-org/GLM-4.7"
HF_API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"

CATEGORIES = [
    "ai", "gry", "programowanie", "filmy", "muzyka", "ebooki", 
    "komiksy", "linux-macos", "privacy", "sport", 
    "narzedzia-graficzne", "torrenty", "pobieranie", "pozostale"
]

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
    """Use Hugging Face API to classify the link."""
    if not HF_TOKEN:
        print("No HF_TOKEN provided, falling back to keyword classification.")
        return classify_fallback(title, description)
    
    prompt = f"""<s>[INST] You are a link categorizer. Based on the title and description, choose ONE category from this list:
{', '.join(CATEGORIES)}

Title: {title}
Description: {description[:300]}

Reply with ONLY the category name, nothing else. [/INST]"""

    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 20,
            "temperature": 0.1,
            "return_full_text": False
        }
    }

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=60)
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                generated = result[0].get("generated_text", "").strip().lower()
                # Extract category from response
                for cat in CATEGORIES:
                    if cat in generated:
                        print(f"AI classified as: {cat}")
                        return cat
        else:
            print(f"HF API error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error calling HF API: {e}")
    
    print("AI classification failed, using fallback.")
    return classify_fallback(title, description)

def classify_fallback(title, description):
    """Fallback keyword-based classification."""
    KEYWORDS = {
        "ai": ["ai", "gpt", "chatbot", "intelligence", "llm", "machine learning"],
        "gry": ["game", "gry", "steam", "crack", "emulator", "gaming"],
        "programowanie": ["code", "programming", "github", "python", "dev", "api"],
        "filmy": ["movie", "film", "serial", "streaming", "netflix"],
        "muzyka": ["music", "muzyka", "audio", "mp3", "spotify"],
        "ebooki": ["ebook", "książka", "pdf", "libgen", "book"],
        "komiksy": ["comic", "manga", "manhwa"],
        "linux-macos": ["linux", "macos", "apple", "ubuntu"],
        "privacy": ["privacy", "vpn", "proxy", "security"],
        "sport": ["sport", "football", "match"],
        "narzedzia-graficzne": ["graphic", "design", "photo", "editor"],
        "torrenty": ["torrent", "1337x", "pirate", "magnet"],
        "pobieranie": ["download", "pobierz"],
    }
    
    text = (title + " " + description).lower()
    scores = {cat: sum(1 for kw in keywords if kw in text) for cat, keywords in KEYWORDS.items()}
    best_cat = max(scores, key=scores.get)
    return best_cat if scores[best_cat] > 0 else "pozostale"

def load_db():
    if not os.path.exists(DB_FILE):
        return {"links": []}
    
    with open(DB_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
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
    
    category = classify_with_ai(title, description)
    print(f"Final category: {category}")
    
    update_db(category, title, URL, description)

if __name__ == "__main__":
    main()
