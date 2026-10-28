import { useEffect, useRef, useState } from 'react'
import { useLang, localizePlace } from '../i18n.js'

function PlaceModal({ place, saved, onClose, onToggle }) {
  const { lang, t } = useLang()
  const view = localizePlace(place, lang)
  const closeRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(view.mapsQuery)

  const rows = []
  if (view.address) {
    rows.push([t('modal.address'), view.address])
  }
  if (view.hours) {
    rows.push([t('modal.hours'), view.hours])
  }
  if (view.phone) {
    rows.push([t('modal.phone'), view.phone])
  }
  rows.push([t('modal.price'), view.priceText])
  rows.push([t('modal.more'), view.meta])

  const rowItems = []
  for (let i = 0; i < rows.length; i++) {
    rowItems.push(
      <div className="info-row" key={i}>
        <dt>{rows[i][0]}</dt>
        <dd>{rows[i][1]}</dd>
      </div>
    )
  }

  let note = null
  if (!view.address) {
    note = <p className="modal-note">{t('modal.noAddress')}</p>
  }

  let websiteLink = null
  if (view.website) {
    websiteLink = (
      <a className="btn btn-light" href={view.website} target="_blank" rel="noreferrer">{t('modal.website')}</a>
    )
  }

  let ticketLink = null
  if (view.ticketUrl) {
    ticketLink = (
      <a className="btn btn-light" href={view.ticketUrl} target="_blank" rel="noreferrer">{t('modal.tickets')}</a>
    )
  }

  let sourceLink = null
  if (view.sourceUrl) {
    sourceLink = (
      <p className="modal-note">
        {t('modal.sourcePrefix')}
        <a href={view.sourceUrl} target="_blank" rel="noreferrer">{t('modal.sourceLink')}</a>
        {t('modal.sourceSuffix')}
      </p>
    )
  }

  let image = null
  if (!imageFailed) {
    image = (
      <img
        src={import.meta.env.BASE_URL + view.image}
        alt={view.alt}
        style={{ '--pos': view.position, objectFit: view.fit }}
        onError={() => setImageFailed(true)}
      />
    )
  }

  let heartText = t('modal.save')
  if (saved) {
    heartText = t('modal.saved')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" ref={closeRef} onClick={onClose} aria-label={t('modal.close')}>✕</button>
        <div className="modal-image" style={{ background: view.imageBg }}>
          <span className="ph" aria-hidden="true">{view.emoji}</span>
          {image}
        </div>
        <div className="modal-body">
          <span className="pill">{view.tag}</span>
          <h2 id="modal-title">{view.title}</h2>
          <p className="modal-sub">{view.subtitle}</p>
          <p>{view.description}</p>
          <dl className="info-list">{rowItems}</dl>
          {note}
          {sourceLink}
          <div className="modal-actions">
            <a className="btn btn-primary" href={mapsUrl} target="_blank" rel="noreferrer">{t('modal.maps')}</a>
            {ticketLink}
            {websiteLink}
            <button type="button" className="btn btn-light" aria-pressed={saved} onClick={() => onToggle(place.name)}>{heartText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceModal
