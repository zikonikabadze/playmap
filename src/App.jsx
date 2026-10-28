import { useState, useRef, useCallback, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Weather from './components/Weather.jsx'
import Categories from './components/Categories.jsx'
import Explore from './components/Explore.jsx'
import Tourist from './components/Tourist.jsx'
import Planner from './components/Planner.jsx'
import Newsletter from './components/Newsletter.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import PlaceModal from './components/PlaceModal.jsx'
import Favorites from './components/Favorites.jsx'
import { places } from './data/places.js'
import { scrollToId, readFavorites, writeFavorites, findAddress, countFavorites } from './utils.js'
import { LangContext, makeT, readLang } from './i18n.js'

function getPage() {
  if (window.location.hash === '#/favorites') {
    return 'favorites'
  }
  return 'home'
}

const defaultAdvanced = { age: 'Any', space: 'Any', price: 'Any' }

function App() {
  const [lang, setLang] = useState(readLang)
  const [page, setPage] = useState(getPage)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [advanced, setAdvanced] = useState(defaultAdvanced)
  const [userCoords, setUserCoords] = useState(null)
  const [favorites, setFavorites] = useState(readFavorites)
  const [openPlace, setOpenPlace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locationLabel, setLocationLabel] = useState('')
  const [toastText, setToastText] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef(null)
  const t = makeT(lang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = 'PlayMap — ' + t('hero.title1') + ' ' + t('hero.title2')
    try {
      localStorage.setItem('playmap-lang', lang)
    } catch (error) {
      return
    }
  }, [lang])

  useEffect(() => {
    function handleHash() {
      setPage(getPage())
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    if (page === 'favorites') {
      window.scrollTo(0, 0)
    } else {
      const id = window.location.hash.replace('#', '')
      if (id !== '' && id !== '/favorites') {
        scrollToId(id)
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [page])

  function showToast(message) {
    setToastText(message)
    setToastVisible(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800)
  }

  function handleToggleLang() {
    if (lang === 'ka') {
      setLang('en')
    } else {
      setLang('ka')
    }
  }

  function handleSkip(event) {
    event.preventDefault()
    document.getElementById('main').focus()
  }

  function handleAdvanced(name, value) {
    const updated = { ...advanced }
    updated[name] = value
    setAdvanced(updated)
  }

  function handleResetFilters() {
    setAdvanced(defaultAdvanced)
    setActiveFilter('All')
    setSearchTerm('')
  }

  function handleQuick(type) {
    const updated = { age: 'Any', space: 'Any', price: 'Any' }
    let filter = 'All'
    if (type === 'rain') {
      updated.space = 'indoor'
    } else if (type === 'outdoor') {
      updated.space = 'outdoor'
    } else if (type === 'free') {
      updated.price = 'Free'
    } else if (type === 'animals') {
      filter = 'ცხოველები და შემეცნება'
    }
    setAdvanced(updated)
    setActiveFilter(filter)
    setSearchTerm('')
    scrollToId('explore')
  }

  function handleClearFavorites() {
    if (window.confirm(t('fav.confirm'))) {
      setFavorites({})
      writeFavorites({})
      showToast(t('toast.cleared'))
    }
  }

  function handleSearch(text) {
    setSearchTerm(text)
    setActiveFilter('All')
    scrollToId('explore')
  }

  function handleCategory(key) {
    setActiveFilter(key)
    scrollToId('explore')
  }

  function handleToggleFavorite(name) {
    const updated = { ...favorites }
    if (updated[name] === true) {
      delete updated[name]
      showToast(t('toast.removed'))
    } else {
      updated[name] = true
      showToast(t('toast.added'))
    }
    setFavorites(updated)
    writeFavorites(updated)
  }

  function handleNearMe() {
    if (!navigator.geolocation) {
      showToast(t('toast.noGeo'))
      return
    }
    showToast(t('toast.askGeo'))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({ lat: position.coords.latitude, lon: position.coords.longitude })
        setLocationLabel(t('loc.me'))
        setActiveFilter('Near')
        scrollToId('explore')
        showToast(t('toast.within5'))
      },
      () => showToast(t('toast.geoDenied')),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }

  async function handleAddress(text) {
    setLoading(true)
    try {
      const found = await findAddress(text, lang)
      if (found === null) {
        showToast(t('toast.addrNotFound'))
      } else {
        setUserCoords({ lat: found.lat, lon: found.lon })
        setLocationLabel(text)
        setActiveFilter('Near')
        showToast(t('toast.within5'))
      }
    } catch (error) {
      showToast(t('toast.addrError'))
    }
    setLoading(false)
  }

  function handleClearLocation() {
    setUserCoords(null)
    setLocationLabel('')
    setActiveFilter('All')
  }

  function handleFilter(key) {
    if (key === 'Near' && userCoords === null) {
      handleNearMe()
      return
    }
    setActiveFilter(key)
  }

  const handleOpen = useCallback((place) => {
    setOpenPlace(place)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenPlace(null)
  }, [])

  function handleTourist() {
    scrollToId('planner')
    showToast(t('toast.tourist'))
  }

  function handleSavePrompt() {
    scrollToId('explore')
    showToast(t('toast.savePrompt'))
  }

  let toastClass = 'toast'
  if (toastVisible) {
    toastClass = 'toast show'
  }

  let content = (
    <>
      <Hero onSearch={handleSearch} />
      <Weather onQuick={handleQuick} />
      <Categories activeFilter={activeFilter} onPick={handleCategory} />
      <Explore
        activeFilter={activeFilter}
        searchTerm={searchTerm}
        userCoords={userCoords}
        favorites={favorites}
        advanced={advanced}
        loading={loading}
        locationLabel={locationLabel}
        onFilter={handleFilter}
        onAdvanced={handleAdvanced}
        onResetFilters={handleResetFilters}
        onToggleFavorite={handleToggleFavorite}
        onAddress={handleAddress}
        onGps={handleNearMe}
        onClearLocation={handleClearLocation}
        onOpen={handleOpen}
      />
      <Tourist onStart={handleTourist} onQuick={handleQuick} />
      <Planner />
      <Newsletter onStart={handleSavePrompt} />
      <About />
    </>
  )
  if (page === 'favorites') {
    content = (
      <Favorites
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpen={handleOpen}
        onClear={handleClearFavorites}
      />
    )
  }

  let modal = null
  if (openPlace !== null) {
    modal = (
      <PlaceModal
        place={openPlace}
        saved={favorites[openPlace.name] === true}
        onClose={handleCloseModal}
        onToggle={handleToggleFavorite}
      />
    )
  }

  return (
    <LangContext.Provider value={{ lang: lang, t: t }}>
      <div id="app">
        <a className="skip-link" href="#main" onClick={handleSkip}>{t('skip')}</a>
        <span id="top"></span>
        <Header
          onNearMe={handleNearMe}
          favoritesCount={countFavorites(places, favorites)}
          onToggleLang={handleToggleLang}
        />
        <main id="main" tabIndex={-1}>
          {content}
        </main>
        <Footer />
        {modal}
        <div className={toastClass} role="status">{toastText}</div>
      </div>
    </LangContext.Provider>
  )
}

export default App
