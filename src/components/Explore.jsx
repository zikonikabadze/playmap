import { lazy, Suspense } from 'react'
import { filters, ageOptions, spaceOptions, priceOptions } from '../data/categories.js'
import { places } from '../data/places.js'
import { getVisiblePlaces } from '../utils.js'
import { useLang } from '../i18n.js'
import LocationSearch from './LocationSearch.jsx'
import PlaceCard from './PlaceCard.jsx'

const MapView = lazy(() => import('./MapView.jsx'))

function buildOptions(list, lang) {
  const result = []
  for (let i = 0; i < list.length; i++) {
    result.push(<option key={list[i].key} value={list[i].key}>{list[i].label[lang]}</option>)
  }
  return result
}

function Explore({
  activeFilter,
  searchTerm,
  userCoords,
  favorites,
  advanced,
  loading,
  locationLabel,
  onFilter,
  onAdvanced,
  onResetFilters,
  onToggleFavorite,
  onAddress,
  onGps,
  onClearLocation,
  onOpen,
}) {
  const { lang, t } = useLang()
  const visible = getVisiblePlaces(places, activeFilter, searchTerm, userCoords, advanced)

  let resetButton = null
  if (
    advanced.age !== 'Any' ||
    advanced.space !== 'Any' ||
    advanced.price !== 'Any' ||
    activeFilter !== 'All' ||
    searchTerm !== ''
  ) {
    resetButton = (
      <button type="button" className="text-btn" onClick={onResetFilters}>{t('explore.reset')}</button>
    )
  }

  const filterButtons = []
  for (let i = 0; i < filters.length; i++) {
    const item = filters[i]
    let className = 'filter'
    if (activeFilter === item.key) {
      className = 'filter active'
    }
    filterButtons.push(
      <button
        key={item.key}
        type="button"
        className={className}
        aria-pressed={activeFilter === item.key}
        onClick={() => onFilter(item.key)}
      >
        {item.label[lang]}
      </button>
    )
  }

  const cards = []
  for (let i = 0; i < visible.length; i++) {
    const item = visible[i]
    cards.push(
      <PlaceCard
        key={item.place.name}
        place={item.place}
        distance={item.distance}
        saved={favorites[item.place.name] === true}
        onToggle={onToggleFavorite}
        onOpen={onOpen}
      />
    )
  }

  let emptyText = t('explore.empty')
  if (activeFilter === 'Near') {
    emptyText = t('explore.emptyNear')
  }
  let emptyMessage = null
  if (visible.length === 0) {
    emptyMessage = (
      <div className="no-results" style={{ display: 'block' }}>{emptyText}</div>
    )
  }

  return (
    <section className="section explore" id="explore" aria-labelledby="explore-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{t('explore.kicker')}</div>
            <h2 id="explore-title">{t('explore.title')}</h2>
            <p className="sub">{t('explore.sub')}</p>
          </div>
          <a className="text-link" href="#planner">{t('explore.link')}</a>
        </div>
        <LocationSearch
          loading={loading}
          label={locationLabel}
          onAddress={onAddress}
          onGps={onGps}
          onClear={onClearLocation}
        />
        <div className="adv-filters">
          <label>
            <span>{t('explore.age')}</span>
            <select value={advanced.age} onChange={(event) => onAdvanced('age', event.target.value)}>
              {buildOptions(ageOptions, lang)}
            </select>
          </label>
          <label>
            <span>{t('explore.space')}</span>
            <select value={advanced.space} onChange={(event) => onAdvanced('space', event.target.value)}>
              {buildOptions(spaceOptions, lang)}
            </select>
          </label>
          <label>
            <span>{t('explore.price')}</span>
            <select value={advanced.price} onChange={(event) => onAdvanced('price', event.target.value)}>
              {buildOptions(priceOptions, lang)}
            </select>
          </label>
          {resetButton}
        </div>
        <div className="filters" role="group" aria-label={t('explore.filters')}>{filterButtons}</div>
        <Suspense fallback={<div className="map-wrap"></div>}>
          <MapView items={visible} userCoords={userCoords} onOpen={onOpen} />
        </Suspense>
        <div className="cards" aria-live="polite">{cards}</div>
        {emptyMessage}
        <p className="disclaimer">{t('explore.disclaimer')}</p>
      </div>
    </section>
  )
}

export default Explore
