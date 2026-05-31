import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PARIS_CENTER: L.LatLngExpression = [48.8566, 2.3522];

const PARIS_MARKER_HTML = `
  <div class="contact-hero__paris-marker">
    <span class="contact-hero__paris-marker-label">Paris</span>
    <span class="contact-hero__paris-marker-pin" aria-hidden="true">📍</span>
  </div>
`;

export function ContactHeroMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: PARIS_CENTER,
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: 'contact-hero__paris-marker-wrap',
      html: PARIS_MARKER_HTML,
      iconSize: [72, 56],
      iconAnchor: [36, 44],
    });

    L.marker(PARIS_CENTER, { icon, interactive: false }).addTo(map);

    const resize = () => map.invalidateSize();
    requestAnimationFrame(resize);
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="contact-hero__map-leaflet" />;
}
