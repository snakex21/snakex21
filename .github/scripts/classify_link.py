import os
import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

# Configuration
DATA_FILE = "LinkHub/data.js"
URL = os.getenv("LINK_URL")
HF_TOKEN = os.getenv("HF_TOKEN")
FORCE_ADD = os.getenv("FORCE_ADD", "false").lower() == "true"

# Default model (will be overridden by config)
DEFAULT_MODEL = "zai-org/GLM-4.7"
BACKUP_MODEL = "mistralai/Ministral-8B-Instruct-2410"

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

def load_config():
    model = DEFAULT_MODEL
    backup = BACKUP_MODEL
    
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            content = f.read()
        
        config_match = re.search(r'const LINKHUB_CONFIG = ({[\s\S]*?});', content)
        if config_match:
            try:
                config = json.loads(config_match.group(1))
                model = config.get("model", DEFAULT_MODEL)
                backup = config.get("backup_model", BACKUP_MODEL)
            except:
                pass
    
    return model, backup

def check_url_exists(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.head(url, headers=headers, timeout=10, allow_redirects=True)
        if response.status_code < 400:
            return True, response.status_code
        return False, response.status_code
    except requests.exceptions.Timeout:
        return False, "timeout"
    except requests.exceptions.ConnectionError:
        return False, "connection_error"
    except Exception as e:
        return False, str(e)

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

def call_model(model_name, prompt):
    if not HF_TOKEN:
        return None
    
    api_url = f"https://api-inference.huggingface.co/models/{model_name}"
    
    try:
        response = requests.post(
            api_url,
            headers={"Authorization": f"Bearer {HF_TOKEN}"},
            json={"inputs": prompt, "parameters": {"max_new_tokens": 100, "temperature": 0.3}},
            timeout=60
        )
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get("generated_text", "").strip()
    except Exception as e:
        print(f"Model {model_name} error: {e}")
    
    return None

def classify_with_ai(title, description, existing_categories):
    main_model, backup_model = load_config()
    print(f"Using model: {main_model}")
    
    if not HF_TOKEN:
        print("No HF_TOKEN, using fallback.")
        return classify_fallback(title, description), None
    
    cat_list = list(existing_categories.keys())
    prompt = f"""<s>[INST] Jesteś klasyfikatorem linków. Wybierz JEDNĄ kategorię z listy: {', '.join(cat_list)}

Jeśli żadna nie pasuje, zaproponuj NOWĄ kategorię po polsku (z emoji).

Tytuł: {title}
Opis: {description[:300]}

Odpowiedz w formacie:
KATEGORIA: nazwa
NOWA: tak/nie
NAZWA_PL: emoji + nazwa (jeśli nowa)
[/INST]"""

    result = call_model(main_model, prompt)
    
    if not result:
        print(f"Main model failed, trying backup: {backup_model}")
        result = call_model(backup_model, prompt)
    
    if result:
        category = None
        is_new = False
        new_cat_info = None
        
        for line in result.split('\n'):
            line_lower = line.strip().lower()
            if line_lower.startswith('kategoria:'):
                category = line_lower.replace('kategoria:', '').strip()
            elif line_lower.startswith('nowa:'):
                is_new = 'tak' in line_lower
            elif line_lower.startswith('nazwa_pl:'):
                name_pl = line.replace('nazwa_pl:', '').replace('NAZWA_PL:', '').strip()
                if is_new and category:
                    colors = ["#8b5cf6", "#ef4444", "#3b82f6", "#f59e0b", "#ec4899", "#10b981"]
                    import random
                    new_cat_info = {"name": name_pl, "color": random.choice(colors)}
        
        if category:
            if category in existing_categories:
                return category, None
            elif is_new and new_cat_info:
                return category, new_cat_info
            else:
                for cat in existing_categories:
                    if cat in category or category in cat:
                        return cat, None
    
    print("AI classification failed, using fallback.")
    return classify_fallback(title, description), None

def classify_fallback(title, description):
    KEYWORDS = {
        "ai": ["ai", "gpt", "chatbot", "llm", "machine learning"],
        "gry": ["game", "gry", "steam", "gaming", "crack"],
        "programowanie": ["code", "programming", "github", "python", "dev"],
        "filmy": ["movie", "film", "serial", "streaming", "youtube", "video"],
        "muzyka": ["music", "muzyka", "audio", "spotify", "mp3"],
        "ebooki": ["ebook", "książka", "pdf", "book", "libgen"],
        "komiksy": ["comic", "manga", "manhwa"],
        "linux-macos": ["linux", "macos", "ubuntu", "apple"],
        "privacy": ["privacy", "vpn", "security"],
        "sport": ["sport", "football", "soccer", "stream", "mecz"],
        "narzedzia-graficzne": ["graphic", "design", "photo"],
        "torrenty": ["torrent", "pirate", "magnet", "1337x"],
        "pobieranie": ["download", "pobierz", "direct"],
    }
    
    text = (title + " " + description).lower()
    scores = {cat: sum(1 for kw in kws if kw in text) for cat, kws in KEYWORDS.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "pozostale"

def load_data():
    if not os.path.exists(DATA_FILE):
        return {}, DEFAULT_CATEGORIES.copy(), [], []
    
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    config = {}
    config_match = re.search(r'const LINKHUB_CONFIG = ({[\s\S]*?});', content)
    if config_match:
        try:
            config = json.loads(config_match.group(1))
        except:
            pass
    
    categories = DEFAULT_CATEGORIES.copy()
    cat_match = re.search(r'const LINKHUB_CATEGORIES = ({[\s\S]*?});', content)
    if cat_match:
        try:
            categories.update(json.loads(cat_match.group(1)))
        except:
            pass
    
    pending = []
    pending_match = re.search(r'const LINKHUB_PENDING = (\[[\s\S]*?\]);', content)
    if pending_match:
        try:
            pending = json.loads(pending_match.group(1))
        except:
            pass
    
    links = []
    links_match = re.search(r'const LINKHUB_LINKS = (\[[\s\S]*?\]);', content)
    if links_match:
        try:
            links = json.loads(links_match.group(1))
        except:
            pass
    
    return config, categories, pending, links

def save_data(config, categories, pending, links):
    js = f"""/*
 * =====================================================
 * LINKHUB DATABASE - AI AUTOMATION RULES
 * =====================================================
 * 
 * WAŻNE DLA AI:
 * 1. NIGDY nie usuwaj istniejących linków z LINKHUB_LINKS
 * 2. TYLKO dodawaj nowe linki na POCZĄTEK tablicy
 * 3. Nie modyfikuj istniejących wpisów
 * 4. Możesz dodawać nowe kategorie do LINKHUB_CATEGORIES
 * 5. Kategorie twórz po polsku z emoji
 * 6. Linki które nie przeszły walidacji dodaj do LINKHUB_PENDING
 * =====================================================
 */

// Konfiguracja - AI może zmienić model na żądanie użytkownika
const LINKHUB_CONFIG = {json.dumps(config, ensure_ascii=False, indent=2)};

const LINKHUB_CATEGORIES = {json.dumps(categories, ensure_ascii=False, indent=2)};

// Linki oczekujące na ręczną weryfikację (nie przeszły walidacji)
const LINKHUB_PENDING = {json.dumps(pending, ensure_ascii=False, indent=2)};

const LINKHUB_LINKS = {json.dumps(links, ensure_ascii=False, indent=2)};
"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(js)

def add_to_pending(url, reason):
    config, categories, pending, links = load_data()
    
    # Don't add duplicates
    if any(p['url'] == url for p in pending):
        print(f"URL already in pending: {url}")
        return
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    pending.insert(0, {
        "url": url,
        "reason": str(reason),
        "attempted": timestamp
    })
    
    save_data(config, categories, pending, links)
    print(f"Added to pending: {url}")

def main():
    if not URL:
        print("No URL provided.")
        return

    print(f"Processing: {URL}")
    
    config, categories, pending, links = load_data()
    
    # Don't add duplicates
    if any(l['url'] == URL for l in links):
        print("Link already exists in main list.")
        return
    
    # Check if URL is reachable (skip if force add)
    if not FORCE_ADD:
        exists, status = check_url_exists(URL)
        if not exists:
            print(f"❌ URL is not reachable: {status}")
            add_to_pending(URL, status)
            print("Link added to PENDING for manual review.")
            return
        print(f"✅ URL is reachable (status: {status})")
    else:
        print("⚡ Force add mode - skipping validation")
        # Remove from pending if it was there
        pending = [p for p in pending if p['url'] != URL]
    
    title, description = scrape_metadata(URL)
    print(f"Title: {title}")
    
    category, new_cat_info = classify_with_ai(title, description, categories)
    print(f"Category: {category}")
    
    if new_cat_info and category not in categories:
        categories[category] = new_cat_info
        print(f"Created new category: {category} -> {new_cat_info}")
    
    if category not in categories:
        category = "pozostale"
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    links.insert(0, {
        "name": title[:80] if len(title) > 80 else title,
        "url": URL,
        "category": category,
        "description": description[:150] if description else "",
        "added": timestamp
    })
    
    save_data(config, categories, pending, links)
    print(f"✅ Added to {DATA_FILE}")

if __name__ == "__main__":
    main()
