import BrandMark from './BrandMark.jsx'
import { useLang } from '../i18n.js'

function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="container footer-inner">
        <div>
          <a href="#top" className="brand">
            <BrandMark /> playmap
          </a>
          <p>{t('footer.text')}</p>
        </div>
        <nav className="footer-links" aria-label={t('nav.footer')}>
          <a href="#explore">{t('nav.explore')}</a>
          <a href="#weather">{t('nav.weather')}</a>
          <a href="#categories">{t('nav.categories')}</a>
          <a href="#planner">{t('nav.planner')}</a>
          <a href="#tourists">{t('nav.tourists')}</a>
          <a href="#/favorites">{t('nav.favorites')}</a>
        </nav>
        <div style={{ fontSize: '11px', color: '#b9d3d2' }}>{t('footer.note')}</div>
      </div>
    </footer>
  )
}

export default Footer
