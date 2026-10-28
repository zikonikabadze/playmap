import { useLang } from '../i18n.js'

function Newsletter({ onStart }) {
  const { t } = useLang()
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter-inner">
        <div>
          <div className="kicker">{t('news.kicker')}</div>
          <h2 id="newsletter-title">{t('news.title')}</h2>
          <p>{t('news.text')}</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={onStart}>{t('news.btn')}</button>
      </div>
    </section>
  )
}

export default Newsletter
