import { createContext, useContext } from 'react'
import { ui } from './data/ui.js'
import { placesEn } from './data/placesEn.js'

export const LangContext = createContext({ lang: 'ka', t: (key) => key })

export function useLang() {
  return useContext(LangContext)
}

export function makeT(lang) {
  return function t(key, vars) {
    let text = key
    if (ui[key]) {
      text = ui[key][lang]
    }
    if (vars) {
      for (const name in vars) {
        text = text.split('{' + name + '}').join(vars[name])
      }
    }
    return text
  }
}

export function localizePlace(place, lang) {
  if (lang === 'ka') {
    return place
  }
  const english = placesEn[place.name]
  if (!english) {
    return place
  }
  return { ...place, ...english }
}

export function readLang() {
  try {
    const saved = localStorage.getItem('playmap-lang')
    if (saved === 'ka' || saved === 'en') {
      return saved
    }
  } catch (error) {
    return 'ka'
  }
  return 'ka'
}
