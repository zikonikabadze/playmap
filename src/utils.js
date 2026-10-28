import { placesEn } from './data/placesEn.js'

export function scrollToId(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export function countInCategory(places, key) {
  let count = 0
  for (let i = 0; i < places.length; i++) {
    if (places[i].categories.includes(key)) {
      count = count + 1
    }
  }
  return count
}

export function countFavorites(places, favorites) {
  let count = 0
  for (let i = 0; i < places.length; i++) {
    if (favorites[places[i].name] === true) {
      count = count + 1
    }
  }
  return count
}

export function distanceKm(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180
  const dLat = (lat2 - lat1) * rad
  const dLon = (lon2 - lon1) * rad
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const ageRanges = {
  '0-2': { min: 0, max: 2 },
  '3-6': { min: 3, max: 6 },
  '7-12': { min: 7, max: 12 },
  '13+': { min: 13, max: 17 },
}

const stopCounts = {
  '2h': 2,
  'half': 3,
  'full': 4,
}

const paidLimits = {
  'free': 0,
  'economy': 1,
  'medium': 2,
  'premium': 4,
}

function fitsAge(place, age) {
  const range = ageRanges[age]
  if (place.ageMin === undefined) {
    return true
  }
  if (place.ageMin > range.max) {
    return false
  }
  if (place.ageMax < range.min) {
    return false
  }
  return true
}

function fitsWeather(place, weather) {
  if (place.indoor === null) {
    return true
  }
  if (weather === 'rainy') {
    return place.indoor === true
  }
  if (weather === 'sunny') {
    return place.indoor === false
  }
  return true
}

function matchesSearch(place, searchTerm) {
  let text = place.name + ' ' + place.title + ' ' + place.subtitle
  const english = placesEn[place.name]
  if (english) {
    text = text + ' ' + english.title + ' ' + english.subtitle
  }
  return text.toLowerCase().includes(searchTerm)
}

export function getVisiblePlaces(places, activeFilter, searchTerm, userCoords, options) {
  const result = []
  for (let i = 0; i < places.length; i++) {
    const place = places[i]
    let ok = true
    let distance = null

    if (activeFilter === 'Near') {
      if (!userCoords || place.lat === undefined) {
        ok = false
      } else {
        distance = distanceKm(userCoords.lat, userCoords.lon, place.lat, place.lon)
        if (distance > 5) {
          ok = false
        }
      }
    } else if (activeFilter !== 'All') {
      if (!place.categories.includes(activeFilter)) {
        ok = false
      }
    }

    if (options.age !== 'Any' && !fitsAge(place, options.age)) {
      ok = false
    }
    if (options.space === 'indoor' && place.indoor !== true) {
      ok = false
    }
    if (options.space === 'outdoor' && place.indoor !== false) {
      ok = false
    }
    if (options.price === 'Free' && place.price !== 'Free') {
      ok = false
    }
    if (options.price === 'Paid' && place.price === 'Free') {
      ok = false
    }

    if (searchTerm !== '' && !matchesSearch(place, searchTerm)) {
      ok = false
    }

    if (ok) {
      result.push({ place: place, distance: distance })
    }
  }

  if (activeFilter === 'Near') {
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].distance < result[i].distance) {
          const temp = result[i]
          result[i] = result[j]
          result[j] = temp
        }
      }
    }
  }
  return result
}

export function buildPlan(places, age, weather, budget, duration) {
  const candidates = []
  for (let i = 0; i < places.length; i++) {
    if (fitsAge(places[i], age) && fitsWeather(places[i], weather)) {
      candidates.push(places[i])
    }
  }

  const ordered = []
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].indoor === false) {
      ordered.push(candidates[i])
    }
  }
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].indoor === null) {
      ordered.push(candidates[i])
    }
  }
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].indoor === true) {
      ordered.push(candidates[i])
    }
  }

  const stops = []
  let paidCount = 0
  for (let i = 0; i < ordered.length; i++) {
    if (stops.length >= stopCounts[duration]) {
      break
    }
    const place = ordered[i]
    if (place.price === 'Free') {
      stops.push(place)
    } else if (paidCount < paidLimits[budget]) {
      stops.push(place)
      paidCount = paidCount + 1
    }
  }
  return stops
}

export function readFavorites() {
  let saved = {}
  try {
    const raw = localStorage.getItem('playmap-favorites')
    if (raw) {
      saved = JSON.parse(raw)
    }
  } catch (error) {
    saved = {}
  }
  return saved
}

export function writeFavorites(favorites) {
  try {
    localStorage.setItem('playmap-favorites', JSON.stringify(favorites))
  } catch (error) {
    return
  }
}

export async function findAddress(text, lang) {
  let query = text
  const lower = text.toLowerCase()
  if (!lower.includes('ბათუმ') && !lower.includes('batumi')) {
    query = text + ', Batumi'
  }
  const url =
    'https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=' + lang +
    '&countrycodes=ge&viewbox=41.55,41.72,41.75,41.58&bounded=1&q=' +
    encodeURIComponent(query)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('request failed')
  }
  const data = await response.json()
  if (data.length === 0) {
    return null
  }
  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    name: data[0].display_name,
  }
}
