import { categories } from '../data/categories.js'
import { places } from '../data/places.js'
import { countInCategory } from '../utils.js'
import { useLang } from '../i18n.js'

function Categories({ activeFilter, onPick }) {
  const { lang, t } = useLang()
  const buttons = []
  for (let i = 0; i < categories.length; i++) {
    const item = categories[i]
    const count = countInCategory(places, item.key)
    let className = 'category'
    if (activeFilter === item.key) {
      className = 'category active'
    }
    buttons.push(
      <button
        key={item.key}
        type="button"
        className={className}
        aria-pressed={activeFilter === item.key}
        onClick={() => onPick(item.key)}
      >
        <span className="category-emoji" aria-hidden="true">{item.emoji}</span>
        <strong>{item.title[lang]}</strong>
        <small>{item.text[lang]} · {t('categories.count', { n: count })}</small>
      </button>
    )
  }

  return (
    <section className="section" id="categories" aria-labelledby="categories-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{t('categories.kicker')}</div>
            <h2 id="categories-title">{t('categories.title')}</h2>
            <p className="sub">{t('categories.sub')}</p>
          </div>
          <a className="text-link" href="#explore">{t('categories.link')}</a>
        </div>
        <div className="categories">{buttons}</div>
      </div>
    </section>
  )
}

export default Categories
