import { useState, useEffect } from 'react'
import { useLang } from '../i18n.js'
import { describeWeather, isRainyCode, weatherUrl } from '../weather.js'

const weekdayNames = {
  ka: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

function Weather({ onQuick }) {
  const { lang, t } = useLang()
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const response = await fetch(weatherUrl)
        if (!response.ok) {
          throw new Error('request failed')
        }
        const json = await response.json()
        if (!cancelled) {
          setData(json)
        }
      } catch (error) {
        if (!cancelled) {
          setFailed(true)
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  let content = <p className="weather-status">{t('weather.loading')}</p>
  if (failed) {
    content = <p className="weather-status">{t('weather.error')}</p>
  }

  if (data) {
    const now = data.current
    const info = describeWeather(now.weather_code, lang)
    const rainToday = isRainyCode(now.weather_code) || data.daily.precipitation_probability_max[0] >= 50

    let tipText = t('weather.tipGood')
    let tipButton = t('weather.btnOutdoor')
    let tipType = 'outdoor'
    if (rainToday) {
      tipText = t('weather.tipRain')
      tipButton = t('weather.btnIndoor')
      tipType = 'rain'
    } else if (now.temperature_2m < 12) {
      tipText = t('weather.tipCold')
      tipButton = t('weather.btnIndoor')
      tipType = 'rain'
    }

    const days = []
    for (let i = 0; i < data.daily.time.length; i++) {
      const dayInfo = describeWeather(data.daily.weather_code[i], lang)
      let dayName = t('weather.today')
      if (i > 0) {
        dayName = weekdayNames[lang][new Date(data.daily.time[i] + 'T12:00:00').getDay()]
      }
      days.push(
        <li key={data.daily.time[i]} className="forecast-day">
          <strong>{dayName}</strong>
          <span className="forecast-emoji" aria-hidden="true">{dayInfo.emoji}</span>
          <span>{Math.round(data.daily.temperature_2m_max[i])}° / {Math.round(data.daily.temperature_2m_min[i])}°</span>
          <small>{dayInfo.label}</small>
          <small>{t('weather.rainChance', { n: data.daily.precipitation_probability_max[i] })}</small>
        </li>
      )
    }

    content = (
      <div className="weather-grid">
        <div className="weather-now">
          <div className="weather-emoji" aria-hidden="true">{info.emoji}</div>
          <div>
            <div className="weather-temp">{Math.round(now.temperature_2m)}°C</div>
            <div className="weather-label">{info.label}</div>
            <small>
              {t('weather.feels', { n: Math.round(now.apparent_temperature) })} · {t('weather.wind', { n: Math.round(now.wind_speed_10m) })} · {t('weather.humidity', { n: Math.round(now.relative_humidity_2m) })}
            </small>
          </div>
          <div className="weather-tip">
            <p>{tipText}</p>
            <button type="button" className="btn btn-primary" onClick={() => onQuick(tipType)}>{tipButton}</button>
          </div>
        </div>
        <div className="weather-forecast">
          <h3>{t('weather.forecast')}</h3>
          <ul className="forecast-list">{days}</ul>
        </div>
      </div>
    )
  }

  return (
    <section className="section weather" id="weather" aria-labelledby="weather-title">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="kicker">{t('weather.kicker')}</div>
            <h2 id="weather-title">{t('weather.title')}</h2>
            <p className="sub">{t('weather.sub')}</p>
          </div>
          <small className="weather-source">{t('weather.source')}</small>
        </div>
        {content}
      </div>
    </section>
  )
}

export default Weather
