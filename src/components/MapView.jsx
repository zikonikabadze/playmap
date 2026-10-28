import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLang, localizePlace } from '../i18n.js'

const pinHtml =
  '<svg width="34" height="40" viewBox="0 0 24 24" fill="#a84a2a" stroke="#ffffff" stroke-width="1">' +
  '<path fill-rule="evenodd" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z"/>' +
  '</svg>'

const pinIcon = L.divIcon({
  html: pinHtml,
  className: 'map-pin',
  iconSize: [34, 40],
  iconAnchor: [17, 38],
  popupAnchor: [0, -34],
})

function MapView({ items, userCoords, onOpen }) {
  const { lang, t } = useLang()
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([41.649, 41.633], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)
    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map
    return () => {
      map.remove()
    }
  }, [])

  useEffect(() => {
    const layer = layerRef.current
    const map = mapRef.current
    layer.clearLayers()
    const points = []

    for (let i = 0; i < items.length; i++) {
      const place = items[i].place
      if (place.lat === undefined) {
        continue
      }
      const view = localizePlace(place, lang)
      const box = document.createElement('div')
      const title = document.createElement('strong')
      title.textContent = view.title
      const sub = document.createElement('div')
      sub.textContent = view.subtitle
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'popup-btn'
      button.textContent = t('map.details')
      button.addEventListener('click', () => onOpen(place))
      box.appendChild(title)
      box.appendChild(sub)
      box.appendChild(button)

      const marker = L.marker([place.lat, place.lon], { icon: pinIcon, title: view.title, riseOnHover: true })
      marker.bindPopup(box)
      marker.addTo(layer)
      points.push([place.lat, place.lon])
    }

    if (userCoords) {
      const me = L.circleMarker([userCoords.lat, userCoords.lon], {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#2a5a5e',
        fillOpacity: 1,
      })
      me.bindTooltip(t('map.you'))
      me.addTo(layer)
      points.push([userCoords.lat, userCoords.lon])
    }

    if (points.length > 0) {
      map.fitBounds(points, { padding: [40, 40], maxZoom: 16 })
    }
  }, [items, userCoords, onOpen, lang])

  return (
    <div className="map-wrap">
      <div ref={containerRef} className="map" role="region" aria-label={t('map.aria')}></div>
    </div>
  )
}

export default MapView
