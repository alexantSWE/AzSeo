<div align="center">

<br/>

```
 █████╗ ███████╗███████╗███████╗ ██████╗
██╔══██╗╚══███╔╝██╔════╝██╔════╝██╔═══██╗
███████║  ███╔╝ ███████╗█████╗  ██║   ██║
██╔══██║ ███╔╝  ╚════██║██╔══╝  ██║   ██║
██║  ██║███████╗███████║███████╗╚██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝
```

### Real-time SEO Analysis — right in your browser.

<br/>

[![Release](https://img.shields.io/github/v/release/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension?style=flat-square&color=00e5cc&label=version)](https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension/releases)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4d9fff?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/)
[![JavaScript](https://img.shields.io/badge/JavaScript-52%25-f5c542?style=flat-square&logo=javascript&logoColor=black)](https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension)
[![HTML](https://img.shields.io/badge/HTML-48%25-ff7a35?style=flat-square&logo=html5&logoColor=white)](https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension)
[![License: MIT](https://img.shields.io/badge/License-MIT-22d97e?style=flat-square)](LICENSE)

<br/>

> **Open the popup. Get your score. Fix your SEO.**  
> No accounts. No servers. No data collection. Everything runs locally.

<br/>

</div>

# AzSeo — Firefox Version
This is a Firefox port of the [Original AzSeo]([AzSeo](https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension)) by @TheGreatAzizi.

**Adapted for Firefox by:** @alexantSWE

---

## ✦ What is AzSeo?

**AzSeo** is a zero-dependency Chromium browser extension that performs instant, in-depth SEO audits on any webpage you visit. It reads the page's DOM locally — no data ever leaves your browser — and returns a detailed score across 15 key SEO factors, ranked tips, and a full feature-flag breakdown.

Built for developers, SEO specialists, and anyone who cares about search visibility.

---

## ✦ Features

- **15-factor SEO audit** — title, meta, headings, HTTPS, images, canonical, OG tags, schema & more
- **100-point scoring system** — with letter grade (A+ → F) and animated score dial
- **3 analysis panels** — Checks (per-item breakdown), Overview (stats & flags), Tips (prioritized actions)
- **Priority-ranked recommendations** — Critical → High → Medium → Low, with impact bars
- **Feature flag grid** — instant view of 8 key technical SEO flags
- **Zero dependencies** — pure vanilla JS, no frameworks, no npm, no bundler
- **Works on any page** — blogs, e-commerce, SPAs, news sites, landing pages
- **Private by design** — all analysis happens in your browser, nothing is sent anywhere

---

## 📊 Scoring System

| # | Factor | Points |
|---|---|:---:|
| 1 | `<title>` — existence + optimal length (30–60 chars) | **15** |
| 2 | Meta description — existence + optimal length (70–160 chars) | **12** |
| 3 | H1 heading — single, present, descriptive | **10** |
| 4 | HTTPS / SSL certificate | **10** |
| 5 | Image alt text — coverage across all `<img>` tags | **8** |
| 6 | Canonical `<link rel="canonical">` | **7** |
| 7 | Open Graph tags — `og:title`, `og:description`, `og:image`, `og:url` | **6** |
| 8 | Viewport meta tag | **5** |
| 9 | `lang` attribute on `<html>` | **5** |
| 10 | Schema.org / JSON-LD structured data | **5** |
| 11 | Word count / content depth | **5** |
| 12 | Favicon | **4** |
| 13 | H2 heading structure | **3** |
| 14 | Twitter Card meta tags | **3** |
| 15 | Lazy loading on images | **2** |
| | **Total** | **100** |

---

## 🚀 Installation

AzSeo is not yet on the Chrome Web Store — load it manually in any Chromium browser (Chrome, Edge, Brave, Arc, Opera).

**1 — Clone or download**

```bash
git clone https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension.git
```

Or grab the latest ZIP from [Releases](https://github.com/TheGreatAzizi/AzSeo--Real-time-SEO-analysis-ChromeExtension/releases).

**2 — Open Extensions**

```
chrome://extensions
```

**3 — Enable Developer Mode**

Toggle **Developer mode** on (top-right corner).

**4 — Load Unpacked**

Click **Load unpacked** → select the cloned/extracted folder.

**5 — Pin & Go**

Click the puzzle icon in your toolbar → pin **AzSeo** → open it on any page.

---

## 🧠 How It Works

```
┌──────────────────────────────────────────────────────────┐
│  Active Browser Tab                                      │
│                                                          │
│  content.js  ──▶  analyzeSEO()  ──▶  DOM data object   │
└───────────────────────────┬──────────────────────────────┘
                            │  chrome.tabs.sendMessage
                            ▼
┌──────────────────────────────────────────────────────────┐
│  Extension Popup                                         │
│                                                          │
│  popup.js  ──▶  calculateScore()  ──▶  renderResults()  │
│            ──▶  generateTips()    ──▶  renderTips()     │
└──────────────────────────────────────────────────────────┘
```

AzSeo injects `content.js` into the active tab. It reads the DOM — headings, meta tags, links, images, structured data — and sends that snapshot to the popup. The popup's scoring engine evaluates all 15 factors, generates ranked tips, and renders everything locally. No network calls are made at any point.

---

## 📁 Project Structure

```
AzSeo/
├── manifest.json       # Manifest V3 — permissions & metadata
├── content.js          # DOM analyzer (runs in page context)
├── popup.html          # Extension popup — layout & styles
├── popup.js            # Scoring engine + rendering logic
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── LICENSE
```

---

## 🔒 Permissions

AzSeo requests the absolute minimum:

| Permission | Purpose |
|---|---|
| `activeTab` | Access the URL and tab context of the current page |
| `scripting` | Inject `content.js` to read the page DOM |

No storage access. No host permissions. No external requests. Your browsing data stays yours.

---

## 🗺️ Roadmap

- [ ] Chrome Web Store release
- [ ] Export full audit as PDF report
- [ ] Per-domain score history & trends
- [ ] Core Web Vitals integration (LCP, CLS, INP)
- [ ] Keyword density + TF-IDF analysis
- [ ] Robots.txt & sitemap.xml checker
- [ ] Side-by-side competitor SEO comparison
- [ ] Firefox / Safari port

---

## 🤝 Contributing

Issues, ideas, and pull requests are very welcome.

```bash
# 1. Fork this repo
# 2. Create your branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: describe what you added"

# 4. Push
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please keep PRs focused with a clear description of what changed and why. Bug reports with reproduction steps are also hugely appreciated.

---

## 📄 License

[MIT](LICENSE) — free to use, fork, and build upon.

---

<div align="center">

<br/>

**Crafted by [@the_azzi](https://x.com/the_azzi)**

<br/>

[![X / Twitter](https://img.shields.io/badge/Follow%20on%20X-%40the__azzi-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/the_azzi)
&nbsp;
[![GitHub](https://img.shields.io/badge/More%20Projects-TheGreatAzizi-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheGreatAzizi)

<br/>

*Found AzSeo useful? Drop a ⭐ — it helps others find it.*

<br/>

</div>
