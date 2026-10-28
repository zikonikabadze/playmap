import { useState } from 'react'
import { useLang, localizePlace } from '../i18n.js'
import { categoryTitle } from '../data/categories.js'

function PlaceCard({ place, distance, saved, onToggle, onOpen }) {
  const { lang, t } = useLang()
  const view = localizePlace(place, lang)
  const [imageFailed, setImageFailed] = useState(false)

  let image = null
  if (!imageFailed) {
    image = (
      <img
        src={import.meta.env.BASE_URL + view.image}
        alt={view.alt}
        loading="lazy"
        style={{ '--pos': view.position, objectFit: view.fit }}
        onError={() => setImageFailed(true)}
      />
    )
  }

  let subtitle = view.subtitle
  if (distance !== null) {
    subtitle = t('card.away', { cat: categoryTitle(view.categories[0], lang), km: distance.toFixed(1) })
  }

  let heartText = '♡'
  let heartClass = 'heart'
  if (saved) {
    heartText = '♥'
    heartClass = 'heart saved'
  }

  return (
    <article className="place-card">
      <div className="place-image" style={{ background: view.imageBg }}>
        <span className="ph" aria-hidden="true">{view.emoji}</span>
        {image}
        <span className="tag">{view.tag}</span>
        <button
          type="button"
          className={heartClass}
          aria-pressed={saved}
          aria-label={t('card.save', { name: view.title })}
          onClick={() => onToggle(place.name)}
        >
          {heartText}
        </button>
      </div>
      <div className="place-body">
        <div className="place-top">
          <div>
            <h3>{view.title}</h3>
            <small>{subtitle}</small>
          </div>
          <span className="price">{view.priceText}</span>
        </div>
        <p className="place-desc">{view.description}</p>
        <button type="button" className="details-btn" onClick={() => onOpen(place)}>
          {t('card.details')}
        </button>
        <div className="place-meta">
          <span>{view.meta}</span>
          <span className="pill">{view.pill}</span>
        </div>
      </div>
    </article>
  )
}

export default PlaceCard
