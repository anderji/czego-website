'use strict';

/* ================================================================
   CZEGO – Sdílené utility
   Používají se na každé stránce
   ================================================================ */

/* ── Helpers ── */
function escHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str || '')));
  return d.innerHTML;
}
function isUpcoming(dateStr) {
  return new Date(dateStr + 'T23:59:59') >= new Date();
}
function getDay(dateStr) {
  return new Date(dateStr + 'T12:00:00').getDate();
}
function getMonthYear(dateStr) {
  const lang = getLang();
  return new Date(dateStr + 'T12:00:00')
    .toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-GB',
      { month: 'long', year: 'numeric' });
}
function sortByDate(arr, dir = 'asc') {
  return [...arr].sort((a, b) =>
    dir === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
}
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ── Jazyk ── */
function getLang() {
  try {
    const stored = localStorage.getItem('czego-lang');
    if (stored === 'cs' || stored === 'en') return stored;
  } catch {}
  return 'cs';
}
function setLang(lang) {
  try { localStorage.setItem('czego-lang', lang); } catch {}
  location.reload();
}

/* ── Fetch dat ── */
async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${path}`);
  return res.json();
}

/* ── Aktivní nav link ── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
    link.setAttribute('aria-current', link.dataset.page === page ? 'page' : 'false');
  });
}

/* ── Render navigace ── */
function renderNav(activePage) {
  const lang = getLang();
  const isCs = lang === 'cs';
  const prefix = '';   // všechny stránky jsou ve stejné složce

  const pages = [
    { file: 'index.html',    cs: 'Domů',    en: 'Home'     },
    { file: 'o-nas.html',    cs: 'O nás',   en: 'About'    },
    { file: 'koncerty.html', cs: 'Koncerty',en: 'Concerts'  },
    { file: 'projekty.html', cs: 'Projekty',en: 'Projects'  },
    { file: 'clenove.html',  cs: 'Členové', en: 'Members'  },
    { file: 'kontakt.html',  cs: 'Kontakt', en: 'Contact'  },
  ];

  const navEl = document.getElementById('nav-links');
  if (!navEl) return;

  navEl.innerHTML = pages.map(p => `
    <li>
      <a class="nav__link${activePage === p.file ? ' active' : ''}"
         href="${prefix}${p.file}"
         data-page="${p.file}"
         ${activePage === p.file ? 'aria-current="page"' : ''}>
        ${isCs ? p.cs : p.en}
      </a>
    </li>
  `).join('') + `
    <li>
      <button class="nav__lang" id="lang-toggle"
        onclick="setLang(getLang() === 'cs' ? 'en' : 'cs')"
        title="${isCs ? 'Switch to English' : 'Přepnout do češtiny'}">
        ${isCs ? 'EN' : 'CS'}
      </button>
    </li>`;

  // Burger menu
  const burger = document.getElementById('nav-burger');
  const links  = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    // Zavři menu po kliknutí na link
    links.querySelectorAll('.nav__link').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }
}

/* ── Render footeru ── */
function renderFooter() {
  const lang = getLang();
  const isCs = lang === 'cs';
  const el = document.getElementById('site-footer-inner');
  if (!el) return;

  el.innerHTML = `
    <div class="footer__grid">
      <div>
        <a class="footer__logo" href="index.html">CZ<span>EGO</span></a>
        <p class="footer__tagline">${isCs ? 'Český kytarový orchestr · Praha' : 'Czech Guitar Orchestra · Prague'}</p>
        <div class="footer__social">
          <a href="https://www.facebook.com/czegocz" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
          <a href="https://open.spotify.com/artist/2Kd9Xiqasp6kTFfpBVBGKI" target="_blank" rel="noopener noreferrer" aria-label="Spotify">sp</a>
          <a href="https://www.youtube.com/@CzechGuitarOrchestra" target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>
        </div>
      </div>
      <div>
        <h3>${isCs ? 'Stránky' : 'Pages'}</h3>
        <nav class="footer__links" aria-label="Footer navigace">
          <a href="index.html">${isCs ? 'Domů' : 'Home'}</a>
          <a href="o-nas.html">${isCs ? 'O nás' : 'About'}</a>
          <a href="koncerty.html">${isCs ? 'Koncerty' : 'Concerts'}</a>
          <a href="projekty.html">${isCs ? 'Projekty' : 'Projects'}</a>
          <a href="clenove.html">${isCs ? 'Členové' : 'Members'}</a>
          <a href="kontakt.html">${isCs ? 'Kontakt' : 'Contact'}</a>
        </nav>
      </div>
      <div>
        <h3>${isCs ? 'Kontakt' : 'Contact'}</h3>
        <div class="footer__links">
          <a href="mailto:info@czego.cz">info@czego.cz</a>
          <a href="https://www.facebook.com/czegocz" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://open.spotify.com/artist/2Kd9Xiqasp6kTFfpBVBGKI" target="_blank" rel="noopener noreferrer">Spotify</a>
          <a href="https://www.youtube.com/@CzechGuitarOrchestra" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <div>
        <h3>${isCs ? 'Děkujeme sponzorům' : 'Thank you to our sponsors'}</h3>
        <div class="footer__links">
          <span style="color:rgba(255,255,255,.4);font-size:.85rem">ZUŠ Pstrossova</span>
          <span style="color:rgba(255,255,255,.4);font-size:.85rem">Praha</span>
          <span style="color:rgba(255,255,255,.4);font-size:.85rem">D'Addario</span>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} CZEGO. ${isCs ? 'Všechna práva vyhrazena.' : 'All rights reserved.'}</span>
      <span>${isCs ? 'Vytvořeno s ❤️ v Praze' : 'Made with ❤️ in Prague'}</span>
    </div>`;
}

/* ── Concert card HTML ── */
function concertCardHTML(c) {
  const lang  = getLang();
  const isCs  = lang === 'cs';
  const up    = isUpcoming(c.date);
  const title = isCs ? c.title_cs : c.title_en;
  const desc  = isCs ? c.description_cs : c.description_en;
  const price = isCs ? c.price_cs : c.price_en;

  return `
  <div class="concert-card">
    <span class="concert-card__badge concert-card__badge--${up ? 'upcoming' : 'past'}">
      ${up ? (isCs ? 'Nadcházející' : 'Upcoming') : (isCs ? 'Proběhlý' : 'Past')}
    </span>
    <div class="concert-card__date">${getDay(c.date)}</div>
    <div class="concert-card__month">${escHtml(getMonthYear(c.date))}</div>
    <div class="concert-card__title">${escHtml(title)}</div>
    <div class="concert-card__meta">📍 ${escHtml(c.venue)}</div>
    ${c.time  ? `<div class="concert-card__meta">🕐 ${escHtml(c.time)}</div>` : ''}
    ${desc    ? `<p class="concert-card__desc">${escHtml(desc)}</p>` : ''}
    ${price   ? `<div><span class="concert-card__price">${escHtml(price)}</span></div>` : ''}
    ${c.tickets ? `<div class="concert-card__tickets">
      ${c.tickets.on_site ? `<span class="concert-card__tickets-label">${isCs ? 'Platba na místě' : 'Pay at the door'}</span>` : ''}
      ${c.tickets.online_url ? `<a class="concert-card__tickets-link" href="${escHtml(c.tickets.online_url)}" target="_blank" rel="noopener noreferrer">${isCs ? 'Koupit online' : 'Buy online'}</a>` : ''}
    </div>` : ''}
    ${c.partner_logo ? `<div class="concert-card__partner"><img src="${escHtml(c.partner_logo)}" alt="${isCs ? 'Logo partnera' : 'Partner logo'}" class="concert-card__partner-logo"></div>` : ''}
  </div>`;
}

/* ── Concert row HTML (koncerty + index) ── */
function concertRowHTML(c) {
  const lang    = getLang();
  const isCs    = lang === 'cs';
  const up      = isUpcoming(c.date);
  const title   = isCs ? c.title_cs : c.title_en;
  const desc    = isCs ? c.description_cs : c.description_en;
  const price   = isCs ? c.price_cs : c.price_en;
  const dateObj   = new Date(c.date + 'T12:00:00');
  const day       = dateObj.getDate();
  const monthYear = dateObj.toLocaleDateString(isCs ? 'cs-CZ' : 'en-GB', { month: 'short', year: 'numeric' });
  return `
  <div class="concert-row${up ? '' : ' concert-row--past'} reveal">
    <div class="concert-row__date">
      <div class="concert-row__day">${day}</div>
      <div class="concert-row__mon">${escHtml(monthYear)}</div>
    </div>
    <div class="concert-row__body">
      <div class="concert-row__top">
        <span class="concert-row__badge concert-row__badge--${up ? 'upcoming' : 'past'}">
          ${up ? (isCs ? 'Nadcházející' : 'Upcoming') : (isCs ? 'Proběhlý' : 'Past')}
        </span>
        ${c.tickets?.online_url ? `<a class="concert-row__ticket-link" href="${escHtml(c.tickets.online_url)}" target="_blank" rel="noopener noreferrer">${isCs ? 'Koupit online' : 'Buy online'} ↗</a>` : ''}
      </div>
      <div class="concert-row__title">${escHtml(title)}</div>
      <div class="concert-row__meta">
        <span>📍 ${escHtml(c.venue)}</span>
        ${c.time ? `<span>🕐 ${escHtml(c.time)}</span>` : ''}
      </div>
      ${desc ? `<div class="concert-row__desc">${escHtml(desc)}</div>` : ''}
      <div class="concert-row__footer">
        ${price ? `<span class="concert-row__price">${escHtml(price)}</span>` : ''}
        ${c.tickets?.on_site ? `<span class="concert-row__ticket-label">${isCs ? 'Platba na místě' : 'Pay at the door'}</span>` : ''}
        ${c.partner_logo ? `<img src="${escHtml(c.partner_logo)}" alt="${isCs ? 'Logo partnera' : 'Partner logo'}" class="concert-row__logo">` : ''}
      </div>
    </div>
  </div>`;
}

/* ── Reveal on scroll ── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Error/loading state ── */
function showError(elId, msg) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = `<div class="error-state">${escHtml(msg)}</div>`;
}
function showLoading(elId) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = `<div class="loading-state"><div class="loading-spinner"></div></div>`;
}
