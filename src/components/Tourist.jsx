import { useState } from 'react'
import { useLang } from '../i18n.js'

function Tourist({ onStart, onQuick }) {
  const { t } = useLang()
  const [imageFailed, setImageFailed] = useState(false)

  let image = null
  if (!imageFailed) {
    image = (
      <img
        src={import.meta.env.BASE_URL + 'images/dzvelibatumismoedani.jpg'}
        alt={t('tourist.imgAlt')}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    )
  }

  return (
    <section className="tourist" id="tourists" aria-labelledby="tourist-title">
      <div className="container">
        <div className="tourist-panel">
          <div className="tourist-copy">
            <div className="kicker">{t('tourist.kicker')}</div>
            <h2 id="tourist-title">{t('tourist.title')}</h2>
            <p>{t('tourist.copy')}</p>
            <button className="btn" type="button" onClick={onStart}>{t('tourist.btn')}</button>
          </div>
          <div className="tourist-image">{image}</div>
        </div>
        <div className="tips">
          <button type="button" className="tip" onClick={() => onQuick('rain')}>
            <span aria-hidden="true">🌧️</span>
            <strong>{t('tip.rain')}</strong>
            <small>{t('tip.rainText')}</small>
          </button>
          <button type="button" className="tip" onClick={() => onQuick('free')}>
            <span aria-hidden="true">♡</span>
            <strong>{t('tip.free')}</strong>
            <small>{t('tip.freeText')}</small>
          </button>
          <button type="button" className="tip" onClick={() => onQuick('animals')}>
            <span aria-hidden="true">🐬</span>
            <strong>{t('tip.animals')}</strong>
            <small>{t('tip.animalsText')}</small>
          </button>
        </div>
        <div className="tourist-trip">
          <img
            src={import.meta.env.BASE_URL + 'images/family-beach.jpg'}
            alt={t('trip.imgAlt')}
            loading="lazy"
          />
          <div>
            <div className="kicker">{t('trip.kicker')}</div>
            <h3>{t('trip.title')}</h3>
            <p>{t('trip.copy')}</p>
            <button className="btn btn-primary" type="button" onClick={onStart}>{t('trip.btn')}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tourist
