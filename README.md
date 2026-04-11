# CZEGO – Český kytarový orchestr (v2)

Statický web s oddělenými HTML stránkami. Optimalizovaný pro GitHub Pages a SEO.

## 📁 Struktura

```
czego/
├── index.html        ← Domovská stránka
├── o-nas.html        ← O nás
├── koncerty.html     ← Koncerty (načítá data/concerts.json)
├── projekty.html     ← Projekty (načítá data/projects.json)
├── clenove.html      ← Členové  (načítá data/members.json)
├── kontakt.html      ← Kontakt
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── css/main.css
│   ├── js/utils.js   ← Sdílené utility (nav, footer, fetch, helpers)
│   └── images/
│       ├── members/  ← Fotky členů (400×300 px JPG)
│       ├── concerts/ ← Fotky z koncertů (640×360 px JPG)
│       ├── projects/ ← Fotky projektů (640×360 px JPG)
│       └── og/       ← og-default.jpg (1200×630 px)
└── data/
    ├── concerts.json
    ├── members.json
    └── projects.json
```

## ✏️ Jak přidat koncert

Otevři `data/concerts.json` a přidej objekt na začátek pole:

```json
{
  "id": 6,
  "date": "2026-12-18",
  "title_cs": "Vánoční koncert 2026",
  "title_en": "Christmas Concert 2026",
  "venue": "Emauzské opatství, Praha 1",
  "time": "18:00–19:30",
  "price_cs": "150–250 Kč",
  "price_en": "150–250 CZK",
  "description_cs": "Popis česky.",
  "description_en": "Description in English.",
  "image": "assets/images/concerts/vanocni-2026.jpg"
}
```

> Datum ve formátu `YYYY-MM-DD`. Web automaticky rozhodne zda je koncert nadcházející nebo proběhlý.

## ✏️ Jak přidat člena

Otevři `data/members.json`:

```json
{
  "id": 6,
  "name": "Jana Nováková",
  "role_cs": "3. kytara",
  "role_en": "3rd Guitar",
  "bio_cs": "Bio česky.",
  "bio_en": "Bio in English.",
  "photo": "assets/images/members/jana-novakova.jpg",
  "social": {
    "instagram": "",
    "facebook": ""
  },
  "order": 6
}
```

## 🌐 Nasazení na GitHub Pages

1. Nahraj složku `czego` na GitHub jako repozitář
2. `Settings → Pages → Source: main branch, / (root)`
3. Web bude na `https://uzivatel.github.io/czego/`

### Vlastní doména czego.cz
1. `Settings → Pages → Custom domain: czego.cz`
2. DNS záznamy u registrátora:
   ```
   A  @  185.199.108.153
   A  @  185.199.109.153
   A  @  185.199.110.153
   A  @  185.199.111.153
   CNAME www uzivatel.github.io
   ```
3. Zaškrtni "Enforce HTTPS"
4. Aktualizuj URL v `sitemap.xml` a meta tagech všech HTML souborů

## 💻 Lokální spuštění

Stránky používají `fetch()` pro načítání JSON dat, proto je potřeba lokální server:

**VS Code:** Nainstaluj rozšíření "Live Server" → klikni "Go Live"

**Python:**
```bash
python3 -m http.server 8080
```

## 🔍 SEO co je v projektu

- Každá stránka má vlastní `<title>`, `<meta description>`, `<link rel="canonical">`
- Open Graph tagy na každé stránce
- JSON-LD strukturovaná data (MusicGroup, Event, Person, ContactPage)
- `hreflang` pro CS/EN na každé stránce
- `sitemap.xml` se všemi 6 URL
- `robots.txt`
- Sémantické HTML (header, main, footer, nav, section, h1–h2)
- `alt` atributy na všech obrázcích
- Skip navigation pro přístupnost

## 📸 Potřebné obrázky

Web funguje bez obrázků (zobrazí placeholder), ale pro produkci připrav:

| Soubor | Rozměry |
|--------|---------|
| `assets/images/og/og-default.jpg` | 1200×630 px |
| `assets/images/members/vladimir-novotny.jpg` | 400×300 px |
| `assets/images/concerts/vanocni-2025.jpg` | 640×360 px |
| `assets/images/projects/kytary-nizkopraho.jpg` | 640×360 px |
