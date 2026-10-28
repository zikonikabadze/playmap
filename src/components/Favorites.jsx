import { places } from '../data/places.js'
import { useLang } from '../i18n.js'
import PlaceCard from './PlaceCard.jsx'

function Favorites({ favorites, onToggleFavorite, onOpen, onClear }) {
  const { t } = useLang()
  const cards = []
  for (let i = 0; i < places.length; i++) {
    if (favorites[places[i].name] === true) {
      cards.push(
        <PlaceCard
          key={places[i].name}
          place={places[i]}
          distance={null}
          saved={true}
          onToggle={onToggleFavorite}
          onOpen={onOpen}
        />
      )
    }
  }

  let content = (
    <div className="empty-favorites">
      <p>{t('fav.empty')}</p>
      <a className="btn btn-primary" href="#explore">{t('fav.emptyBtn')}</a>
    </div>
  )
  let clearButton = null
  if (cards.length > 0) {
    content = <div className="cards">{cards}</div>
    clearButton = (
      <button type="button" className="btn btn-light" onClick={onClear}>{t('fav.clearAll')}</button>
    )
  }

  return (
    <section className="section explore favorites" aria-labelledby="favorites-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{t('fav.kicker')}</div>
            <h1 id="favorites-title">{t('fav.title')}</h1>
            <p className="sub">{t('fav.sub', { n: cards.length })}</p>
          </div>
          <div className="favorites-actions">
            <a className="text-link" href="#top">{t('fav.back')}</a>
            {clearButton}
          </div>
        </div>
        {content}
      </div>
    </section>
  )
}

export default Favorites
