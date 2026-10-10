// Small helpers shared by tool and game pages (window.Kit).
// Every helper degrades quietly: no clipboard, storage or crypto never breaks a page.
(() => {
  if (window.Kit) return;
  let toastEl = null;
  let toastTimer = 0;

  function toast(message, ms = 1800) {
    if (!document.body) return;
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'kit-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  // Copies text and briefly relabels the button; falls back to a hidden textarea
  // where the async clipboard API is missing (old browsers, http:// pages).
  async function copy(text, button) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (_) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
      area.remove();
    }
    if (button) {
      const label = button.dataset.kitLabel || button.textContent;
      button.dataset.kitLabel = label;
      button.textContent = ok ? 'Skopiowano' : 'Nie udało się';
      setTimeout(() => { button.textContent = label; }, 1500);
    } else {
      toast(ok ? 'Skopiowano do schowka' : 'Nie udało się skopiować');
    }
    return ok;
  }

  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // JSON storage that survives private mode, quota errors and corrupt values.
  function store(key) {
    return {
      get(fallback) {
        try {
          const raw = localStorage.getItem(key);
          return raw === null ? fallback : JSON.parse(raw);
        } catch (_) { return fallback; }
      },
      set(value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
      },
      remove() {
        try { localStorage.removeItem(key); } catch (_) {}
      }
    };
  }

  // Uniform integer in [0, max) from the platform CSPRNG when available.
  function randomInt(max) {
    const cryptoApi = window.crypto;
    if (!cryptoApi || !cryptoApi.getRandomValues || max <= 0) return Math.floor(Math.random() * max);
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    do { cryptoApi.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % max;
  }

  window.Kit = { toast, copy, download, store, randomInt };
})();
