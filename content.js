// Prevent double-injection bug
if (typeof window.hasAzSeoRun === 'undefined') {
  window.hasAzSeoRun = true;

  window.analyzeSEO = function() {
    const data = {};

    const title = document.querySelector('title');
    data.title = { text: title?.innerText?.trim() || '', length: title?.innerText?.trim()?.length || 0 };

    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = metaDesc?.getAttribute('content') || '';
    data.metaDescription = { text: descContent, length: descContent.length, exists: !!metaDesc };

    const metaKw = document.querySelector('meta[name="keywords"]');
    data.metaKeywords = { text: metaKw?.getAttribute('content') || '', exists: !!metaKw };

    // Headings (Now tracks hierarchy to detect skipped levels)
    const headingEls = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    data.headings = {
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()),
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length,
      h4: document.querySelectorAll('h4').length,
      order: headingEls.map(h => parseInt(h.tagName[1])) // Tracks[1, 2, 4, 3...]
    };

    // Images (Now ignores decorative images for accurate SEO/Accessibility scoring)
    const allImgs = Array.from(document.querySelectorAll('img')).filter(i => {
      return i.getAttribute('role') !== 'presentation' && i.getAttribute('aria-hidden') !== 'true';
    });
    const noAlt = allImgs.filter(i => !i.hasAttribute('alt') || !i.getAttribute('alt').trim());
    data.images = { total: allImgs.length, withoutAlt: noAlt.length, withAlt: allImgs.length - noAlt.length };

    // Links (Now tracks empty/broken links and nofollow attributes)
    const allLinks = Array.from(document.querySelectorAll('a'));
    const emptyLinks = allLinks.filter(a => {
      const h = a.getAttribute('href');
      return !h || h === '#' || h.startsWith('javascript');
    });
    const validLinks = allLinks.filter(a => !emptyLinks.includes(a));

    const filterLink = (internal) => validLinks.filter(a => {
      try {
        const url = new URL(a.getAttribute('href'), window.location.href);
        return internal ? url.hostname === window.location.hostname : url.hostname !== window.location.hostname;
      } catch { return false; }
    });
    const nofollowLinks = validLinks.filter(a => (a.getAttribute('rel') || '').toLowerCase().includes('nofollow'));

    data.links = {
      total: allLinks.length, internal: filterLink(true).length, external: filterLink(false).length,
      empty: emptyLinks.length, nofollow: nofollowLinks.length
    };

    const canonical = document.querySelector('link[rel="canonical"]');
    data.canonical = { exists: !!canonical, url: canonical?.getAttribute('href') || '' };

    const og = (prop) => !!document.querySelector(`meta[property="og:${prop}"]`);
    data.openGraph = { title: og('title'), description: og('description'), image: og('image'), url: og('url') };

    const tw = (name) => document.querySelector(`meta[name="twitter:${name}"]`);
    data.twitterCard = { exists: !!tw('card'), type: tw('card')?.getAttribute('content') || '' };

    const robots = document.querySelector('meta[name="robots"]');
    data.robots = { exists: !!robots, content: robots?.getAttribute('content') || '' };

    const vp = document.querySelector('meta[name="viewport"]');
    data.viewport = { exists: !!vp, content: vp?.getAttribute('content') || '' };

    const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
    const schemas =[];
    jsonLd.forEach(s => {
      try { schemas.push(JSON.parse(s.textContent)['@type'] || 'Unknown'); } catch {}
    });
    data.structuredData = { count: jsonLd.length, types: schemas };

    const words = (document.body?.innerText || '').trim().split(/\s+/).filter(w => w.length > 0);
    data.content = { wordCount: words.length };
    data.https = { secure: window.location.protocol === 'https:' };
    data.lang = { exists: !!document.documentElement.getAttribute('lang'), value: document.documentElement.getAttribute('lang') || '' };
    data.url = { full: window.location.href, hostname: window.location.hostname, hasUnderscores: window.location.pathname.includes('_'), length: window.location.href.length };
    data.favicon = { exists: !!document.querySelector('link[rel*="icon"]') };
    data.performance = { hasLazyImages: !!document.querySelector('img[loading="lazy"]') };

    return data;
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeSEO') {
      sendResponse(window.analyzeSEO());
    } else if (request.action === 'highlightImages') {
      // --- THE HIGHLIGHT FEATURE ---
      const badImgs = Array.from(document.querySelectorAll('img')).filter(i => {
        return i.getAttribute('role') !== 'presentation' &&
        i.getAttribute('aria-hidden') !== 'true' &&
        (!i.hasAttribute('alt') || !i.getAttribute('alt').trim());
      });
      badImgs.forEach(img => {
        img.style.border = '5px solid #ff4060';
        img.style.boxShadow = '0 0 20px #ff4060';
        img.style.transition = 'all 0.3s ease';
      });
      sendResponse({ success: true });
    }
    return true;
  });
}
