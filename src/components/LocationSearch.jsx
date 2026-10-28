import { useState } from 'react'
import { useLang } from '../i18n.js'

function LocationSearch({ loading, label, onAddress, onGps, onClear }) {
  const { t } = useLang()
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() !== '') {
      onAddress(text.trim())
    }
  }

  let buttonText = t('loc.btn')
  if (loading) {
    buttonText = t('loc.loading')
  }

  let current = null
  if (label !== '') {
    current = (
      <p className="location-current">
        {t('loc.current', { label: label })}
        <button type="button" className="location-clear" onClick={onClear}>{t('loc.clear')}</button>
      </p>
    )
  }

  return (
    <div className="location-search">
      <form className="location-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="addressInput">{t('loc.label')}</label>
        <input
          id="addressInput"
          type="text"
          placeholder={t('loc.placeholder')}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>{buttonText}</button>
        <button className="btn btn-light" type="button" onClick={onGps}>{t('loc.gps')}</button>
      </form>
      {current}
    </div>
  )
}

export default LocationSearch
