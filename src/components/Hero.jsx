import { useState } from 'react'
import { useLang } from '../i18n.js'

function Hero({ onSearch }) {
  const { t } = useLang()
  const [text, setText] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(text.trim().toLowerCase())
  }

  let image = null
  if (!imageFailed) {
    image = (
      <img
        src={import.meta.env.BASE_URL + 'images/hero.jpg'}
        alt={t('hero.imgAlt')}
        fetchpriority="high"
        onError={() => setImageFailed(true)}
        style={{ zIndex: 1 }}
      />
    )
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow"><span aria-hidden="true">✦</span> {t('hero.eyebrow')}</div>
          <h1 id="hero-title">{t('hero.title1')}<br /><em>{t('hero.title2')}</em></h1>
          <p className="hero-copy">{t('hero.copy')}</p>
          <form className="search-panel" role="search" onSubmit={handleSubmit}>
            <span style={{ fontSize: '20px', paddingLeft: '8px' }} aria-hidden="true">⌕</span>
            <label className="sr-only" htmlFor="searchInput">{t('hero.searchLabel')}</label>
            <input
              id="searchInput"
              type="search"
              placeholder={t('hero.searchPlaceholder')}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">{t('hero.searchBtn')}</button>
          </form>
          <ul className="hero-meta" style={{ listStyle: 'none', padding: 0 }}>
            <li><span>{t('hero.meta1')}</span></li>
            <li><span>{t('hero.meta2')}</span></li>
            <li><span>{t('hero.meta3')}</span></li>
          </ul>
        </div>
        <div className="hero-art">
          <span className="ph" aria-hidden="true" style={{ fontSize: '72px' }}>🧒</span>
          {image}
          <div className="art-overlay" style={{ zIndex: 1 }}></div>
          <div className="float-card float-two" style={{ zIndex: 2 }}>
            <span className="float-icon" aria-hidden="true">📍</span>
            <div>
              <strong>{t('hero.card2Title')}</strong>
              <small>{t('hero.card2Text')}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
