import json
import re
from datetime import datetime

# Keywords for classification
KEYWORDS = {
    'ai': ['ai', 'gpt', 'chatbot', 'llm', 'openai', 'claude', 'gemini', 'deepseek', 'mistral', 'huggingface', 'character.ai'],
    'gry': ['game', 'gaming', 'steam', 'itch.io', 'gog', 'romhack', 'emulator', 'retro', 'arcade', 'nes', 'snes', 'playstation', 'xbox', 'nintendo', 'repack', 'crack'],
    'programowanie': ['github', 'gitlab', 'code', 'dev', 'programming', 'python', 'javascript', 'rust', 'npm', 'developer'],
    'filmy': ['movie', 'film', 'serial', 'streaming', 'youtube', 'video', 'netflix', 'hbo', 'disney', 'watch', 'cinema', 'anime', 'cartoon'],
    'muzyka': ['music', 'audio', 'spotify', 'mp3', 'soundcloud', 'bandcamp', 'song', 'album', 'radio', 'midi', 'podcast'],
    'ebooki': ['ebook', 'book', 'pdf', 'libgen', 'library', 'read', 'epub', 'anna', 'z-lib', 'audiobook'],
    'komiksy': ['comic', 'manga', 'manhwa', 'webtoon', 'hentai', 'doujin', 'mangadex'],
    'linux-macos': ['linux', 'macos', 'ubuntu', 'fedora', 'arch', 'debian', 'gnu', 'apple', 'mac'],
    'privacy': ['privacy', 'vpn', 'security', 'anonymous', 'tor', 'encrypt', 'password', 'bitwarden', 'adblock'],
    'sport': ['sport', 'football', 'soccer', 'basketball', 'tennis', 'nba', 'nfl', 'stream', 'cricket', 'boxing', 'wrestling', 'mma', 'f1'],
    'narzedzia-graficzne': ['graphic', 'design', 'photo', 'image', 'paint', 'draw', 'art', 'pixel', 'font', 'icon'],
    'torrenty': ['torrent', 'pirate', 'magnet', '1337x', 'rarbg', 'tracker', 'nyaa', 'rutracker'],
    'pobieranie': ['download', 'direct', 'ddl', 'mega', 'mediafire', 'upload', 'file', 'jdownloader', 'gdrive'],
}

def classify(url):
    url_lower = url.lower()
    for cat, kws in KEYWORDS.items():
        for kw in kws:
            if kw in url_lower:
                return cat
    return 'pozostale'

# Load links from file
with open('LinkHub/import-links.txt', 'r', encoding='utf-8') as f:
    urls = [line.strip() for line in f if line.strip() and line.strip().startswith('http')]

print(f'Loaded {len(urls)} URLs')

# Load existing data.js
with open('LinkHub/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract existing links
links = []
links_match = re.search(r'const LINKHUB_LINKS = (\[[\s\S]*?\]);', content)
if links_match:
    try:
        links = json.loads(links_match.group(1))
    except:
        print("Could not parse existing links, starting fresh")
        links = []

existing_urls = {l['url'] for l in links}
print(f'Existing links: {len(existing_urls)}')

# Add new links
timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
added = 0
for url in urls:
    if url not in existing_urls:
        cat = classify(url)
        domain = url.split('//')[-1].split('/')[0]
        links.append({
            'name': domain[:60],
            'url': url,
            'category': cat,
            'description': '',
            'added': timestamp
        })
        existing_urls.add(url)  # Prevent duplicates within import
        added += 1

print(f'Added {added} new links')
print(f'Total links now: {len(links)}')

# Write back
new_links = json.dumps(links, ensure_ascii=False, indent=2)
content = re.sub(r'const LINKHUB_LINKS = \[[\s\S]*?\];', f'const LINKHUB_LINKS = {new_links};', content)

with open('LinkHub/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done! data.js updated.')
