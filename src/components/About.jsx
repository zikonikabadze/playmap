import { useLang } from '../i18n.js'

function About() {
  const { t } = useLang()
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div>
          <div className="kicker">{t('about.kicker')}</div>
          <h2 id="about-title">{t('about.title')}</h2>
          <p className="sub">{t('about.sub')}</p>
        </div>
        <ul className="about-list">
          <li><strong>{t('about.a')}</strong><span>{t('about.at')}</span></li>
          <li><strong>{t('about.b')}</strong><span>{t('about.bt')}</span></li>
          <li><strong>{t('about.c')}</strong><span>{t('about.ct')}</span></li>
        </ul>
      </div>
    </section>
  )
}

export default About
