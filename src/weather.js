const conditions = {
  0: { emoji: '☀️', ka: 'მოწმენდილი', en: 'Clear sky' },
  1: { emoji: '🌤️', ka: 'ძირითადად მზიანი', en: 'Mostly clear' },
  2: { emoji: '⛅', ka: 'ნაწილობრივ მოღრუბლული', en: 'Partly cloudy' },
  3: { emoji: '☁️', ka: 'მოღრუბლული', en: 'Overcast' },
  45: { emoji: '🌫️', ka: 'ნისლი', en: 'Fog' },
  48: { emoji: '🌫️', ka: 'ნისლი', en: 'Fog' },
  51: { emoji: '🌦️', ka: 'წვრილი წვიმა', en: 'Light drizzle' },
  53: { emoji: '🌦️', ka: 'წვრილი წვიმა', en: 'Drizzle' },
  55: { emoji: '🌦️', ka: 'წვრილი წვიმა', en: 'Heavy drizzle' },
  56: { emoji: '🌧️', ka: 'გაყინვადი ცვარ-წვიმა', en: 'Freezing drizzle' },
  57: { emoji: '🌧️', ka: 'გაყინვადი ცვარ-წვიმა', en: 'Freezing drizzle' },
  61: { emoji: '🌧️', ka: 'მცირე წვიმა', en: 'Light rain' },
  63: { emoji: '🌧️', ka: 'წვიმა', en: 'Rain' },
  65: { emoji: '🌧️', ka: 'ძლიერი წვიმა', en: 'Heavy rain' },
  66: { emoji: '🌧️', ka: 'გაყინვადი წვიმა', en: 'Freezing rain' },
  67: { emoji: '🌧️', ka: 'გაყინვადი წვიმა', en: 'Freezing rain' },
  71: { emoji: '🌨️', ka: 'მცირე თოვლი', en: 'Light snow' },
  73: { emoji: '🌨️', ka: 'თოვლი', en: 'Snow' },
  75: { emoji: '❄️', ka: 'ძლიერი თოვლი', en: 'Heavy snow' },
  77: { emoji: '🌨️', ka: 'თოვლის მარცვლები', en: 'Snow grains' },
  80: { emoji: '🌦️', ka: 'კოკისპირული წვიმა', en: 'Rain showers' },
  81: { emoji: '🌧️', ka: 'კოკისპირული წვიმა', en: 'Rain showers' },
  82: { emoji: '⛈️', ka: 'ძლიერი კოკისპირული წვიმა', en: 'Violent rain showers' },
  85: { emoji: '🌨️', ka: 'თოვლის ნალექი', en: 'Snow showers' },
  86: { emoji: '🌨️', ka: 'თოვლის ნალექი', en: 'Snow showers' },
  95: { emoji: '⛈️', ka: 'ჭექა-ქუხილი', en: 'Thunderstorm' },
  96: { emoji: '⛈️', ka: 'ჭექა-ქუხილი სეტყვით', en: 'Thunderstorm with hail' },
  99: { emoji: '⛈️', ka: 'ჭექა-ქუხილი სეტყვით', en: 'Thunderstorm with hail' },
}

export function describeWeather(code, lang) {
  const found = conditions[code]
  if (!found) {
    return { emoji: '🌡️', label: '' }
  }
  return { emoji: found.emoji, label: found[lang] }
}

export function isRainyCode(code) {
  if (code >= 51 && code <= 67) {
    return true
  }
  if (code >= 80 && code <= 82) {
    return true
  }
  if (code >= 95) {
    return true
  }
  return false
}

export const weatherUrl =
  'https://api.open-meteo.com/v1/forecast?latitude=41.6459&longitude=41.6367' +
  '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=Asia%2FTbilisi&forecast_days=5'
