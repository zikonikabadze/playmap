import { useState, useEffect, useRef } from 'react'
import { places } from '../data/places.js'
import { ageOptions } from '../data/categories.js'
import { buildPlan } from '../utils.js'
import { useLang, localizePlace } from '../i18n.js'

const weatherKeys = ['any', 'sunny', 'rainy']
const budgetKeys = ['free', 'economy', 'medium', 'premium']
const durationKeys = ['2h', 'half', 'full']

function Planner() {
  const { lang, t } = useLang()
  const [age, setAge] = useState('3-6')
  const [weather, setWeather] = useState('any')
  const [budget, setBudget] = useState('economy')
  const [duration, setDuration] = useState('half')
  const [plan, setPlan] = useState(null)
  const resultRef = useRef(null)

  useEffect(() => {
    if (plan && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [plan])

  function handleSubmit(event) {
    event.preventDefault()
    setPlan({
      age: age,
      weather: weather,
      budget: budget,
      duration: duration,
      stops: buildPlan(places, age, weather, budget, duration),
    })
  }

  const ageItems = []
  for (let i = 1; i < ageOptions.length; i++) {
    ageItems.push(<option key={ageOptions[i].key} value={ageOptions[i].key}>{ageOptions[i].label[lang]}</option>)
  }
  const weatherItems = []
  for (let i = 0; i < weatherKeys.length; i++) {
    weatherItems.push(<option key={weatherKeys[i]} value={weatherKeys[i]}>{t('w.' + weatherKeys[i])}</option>)
  }
  const budgetItems = []
  for (let i = 0; i < budgetKeys.length; i++) {
    budgetItems.push(<option key={budgetKeys[i]} value={budgetKeys[i]}>{t('b.' + budgetKeys[i])}</option>)
  }
  const durationItems = []
  for (let i = 0; i < durationKeys.length; i++) {
    durationItems.push(<option key={durationKeys[i]} value={durationKeys[i]}>{t('d.' + durationKeys[i])}</option>)
  }

  let result = null
  if (plan) {
    const items = []
    for (let i = 0; i < plan.stops.length; i++) {
      const stop = localizePlace(plan.stops[i], lang)
      items.push(
        <li key={stop.name}>
          <strong>{stop.title}</strong> — {stop.subtitle} ({stop.priceText})
        </li>
      )
    }

    let list = <p>{t('planner.none')}</p>
    if (items.length > 0) {
      list = <ol>{items}</ol>
    }

    let ageLabel = plan.age
    for (let i = 0; i < ageOptions.length; i++) {
      if (ageOptions[i].key === plan.age) {
        ageLabel = ageOptions[i].label[lang]
      }
    }

    result = (
      <div className="planner-results" style={{ display: 'block' }} ref={resultRef} aria-live="polite">
        <strong>{t('planner.result')}</strong>
        <br />
        {ageLabel} · {t('w.' + plan.weather)} · {t('b.' + plan.budget)} · {t('d.' + plan.duration)}
        {list}
        <small>{t('planner.note')}</small>
      </div>
    )
  }

  return (
    <section className="section planner" id="planner" aria-labelledby="planner-title">
      <div className="container planner-grid">
        <div>
          <div className="kicker">{t('planner.kicker')}</div>
          <h2 id="planner-title">{t('planner.title')}</h2>
          <p className="sub">{t('planner.sub')}</p>
          <div className="mini-stops" style={{ marginTop: '24px' }}>
            <div className="stop">
              <span className="stop-icon" aria-hidden="true">🌳</span>
              <div><strong>{t('planner.s1')}</strong><small>{t('planner.s1t')}</small></div>
            </div>
            <div className="stop">
              <span className="stop-icon" aria-hidden="true">🍓</span>
              <div><strong>{t('planner.s2')}</strong><small>{t('planner.s2t')}</small></div>
            </div>
            <div className="stop">
              <span className="stop-icon" aria-hidden="true">🎨</span>
              <div><strong>{t('planner.s3')}</strong><small>{t('planner.s3t')}</small></div>
            </div>
          </div>
        </div>
        <div className="planner-box">
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>{t('planner.formTitle')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="plan-age">{t('planner.age')}</label>
              <select id="plan-age" value={age} onChange={(event) => setAge(event.target.value)}>{ageItems}</select>
            </div>
            <div className="field">
              <label htmlFor="plan-weather">{t('planner.weather')}</label>
              <select id="plan-weather" value={weather} onChange={(event) => setWeather(event.target.value)}>{weatherItems}</select>
            </div>
            <div className="field">
              <label htmlFor="plan-budget">{t('planner.budget')}</label>
              <select id="plan-budget" value={budget} onChange={(event) => setBudget(event.target.value)}>{budgetItems}</select>
            </div>
            <div className="field">
              <label htmlFor="plan-duration">{t('planner.time')}</label>
              <select id="plan-duration" value={duration} onChange={(event) => setDuration(event.target.value)}>{durationItems}</select>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} type="submit">{t('planner.submit')}</button>
            {result}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Planner
