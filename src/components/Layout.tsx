import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../lib/theme';
import { useLang } from '../lib/i18n';

function useNav() {
  const { t } = useLang();
  return [
    { to: '/', label: t('home'), end: true },
    { to: '/topics', label: t('topics') },
    { to: '/questions', label: t('bank') },
    { to: '/papers', label: t('papers') },
    { to: '/repeated', label: t('repeated') },
    { to: '/important', label: t('important') },
    { to: '/revision', label: t('revision') },
  ];
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function Layout() {
  const [theme, setTheme] = useTheme();
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const NAV = useNav();

  useEffect(() => setMobileOpen(false), []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/questions?q=${encodeURIComponent(query)}` : '/questions');
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <NavLink to="/" className="brand" aria-label="AppDev1 Exam Atlas home">
            <span className="brand-mark" aria-hidden="true">
              A1
            </span>
            <span>AppDev1 Atlas</span>
          </NavLink>

          <nav className="main-nav" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <form onSubmit={submitSearch} role="search" className="search-box header-search">
              <label htmlFor="global-search" className="sr-only">
                Search questions
              </label>
              <SearchIcon />
              <input
                id="global-search"
                className="input"
                type="search"
                placeholder="Search questions…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{ height: 34, fontSize: 13 }}
              />
            </form>
            <button
              type="button"
              className="icon-btn"
              aria-label={lang === 'en' ? 'Switch to Hinglish' : 'Switch to English'}
              title={lang === 'en' ? 'EN → Hinglish' : 'Hinglish → EN'}
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              style={{ width: 'auto', padding: '0 10px', fontSize: 12, fontWeight: 700 }}
            >
              {lang === 'en' ? 'EN' : 'हिं'}
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
              title={`Theme: ${theme}`}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              type="button"
              className="icon-btn mobile-nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <nav className="container" aria-label="Primary mobile" style={{ paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <form onSubmit={submitSearch} role="search" className="search-box mobile-search">
              <label htmlFor="global-search-mobile" className="sr-only">
                Search questions
              </label>
              <SearchIcon />
              <input
                id="global-search-mobile"
                className="input"
                type="search"
                placeholder="Search questions…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{ height: 40, fontSize: 15, width: '100%' }}
              />
            </form>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
                style={{ padding: '10px 8px', borderRadius: 8 }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            AppDev1 Exam Atlas is transcribed from five source papers — four official IITM BS Diploma end-term question
            papers and one practice paper — for study purposes. Every question links back to its source paper and
            question number.
          </p>
          <p className="faint" style={{ marginBottom: 0 }}>
            Not affiliated with IIT Madras. Built for exam preparation.
          </p>
        </div>
      </footer>
    </>
  );
}
