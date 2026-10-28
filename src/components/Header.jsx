import { useState } from 'react'
import BrandMark from './BrandMark.jsx'
import { scrollToId } from '../utils.js'
import { useLang } from '../i18n.js'

const links = [
  { href: '#explore', key: 'nav.explore' },
  { href: '#weather', key: 'nav.weather' },
  { href: '#categories', key: 'nav.categories' },
  { href: '#planner', key: 'nav.planner' },
  { href: '#tourists', key: 'nav.tourists' },
  { href: '#about', key: 'nav.about' },
]

function Header({ onNearMe, favoritesCount, onToggleLang }) {
  const { t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const desktopLinks = []
  const mobileLinks = []
  for (let i = 0; i < links.length; i++) {
    desktopLinks.push(<a key={links[i].href} href={links[i].href}>{t(links[i].key)}</a>)
    mobileLinks.push(
      <a key={links[i].href} href={links[i].href} onClick={() => setMenuOpen(false)}>{t(links[i].key)}</a>
    )
  }

  let panelClass = 'mobile-panel'
  if (menuOpen) {
    panelClass = 'mobile-panel open'
  }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{t('topbar.left')}</span>
          <span>{t('topbar.right')}</span>
        </div>
      </div>
      <header>
        <div className="container nav">
          <a href="#top" className="brand">
            <BrandMark /> playmap
          </a>
          <nav className="navlinks" aria-label={t('nav.main')}>
            {desktopLinks}
            <a href="#/favorites">♡ {t('nav.favorites')} ({favoritesCount})</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-btn lang-btn" type="button" onClick={onToggleLang} aria-label={t('lang.aria')}>
              {t('lang.label')}
            </button>
            <a className="icon-btn heart-link" href="#/favorites" aria-label={t('header.fav', { n: favoritesCount })}>
              ♡<span className="heart-count">{favoritesCount}</span>
            </a>
            <button className="icon-btn" type="button" onClick={onNearMe} aria-label={t('header.near')}>⌖</button>
            <button className="btn btn-primary" type="button" onClick={() => scrollToId('explore')}>{t('header.cta')}</button>
            <button
              className="icon-btn mobile-menu"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t('header.menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-panel"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        <nav id="mobile-panel" className={panelClass} aria-label={t('nav.mobile')}>
          {mobileLinks}
          <a href="#/favorites" onClick={() => setMenuOpen(false)}>♡ {t('nav.favorites')} ({favoritesCount})</a>
        </nav>
      </header>
    </>
  )
}

export default Header
