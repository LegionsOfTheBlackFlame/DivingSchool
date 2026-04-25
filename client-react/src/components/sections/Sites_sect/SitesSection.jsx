import React, { useMemo, useState,useEffect } from 'react';
import { MapPin, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const DIVE_SITES = [
  {
    id: 'blue-cave',
    name: 'Blue Cave (Mavi Mağara)',
    description:
      'A famous underwater cave known for intense blue light reflections. The entrance is wide and welcoming, making it a favorite for both beginners and experienced divers.',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    lat: 36.1913,
    lng: 29.6115,
  },
  {
    id: 'canyon',
    name: 'The Canyon',
    description:
      'One of Kaş’s most iconic dive sites, featuring dramatic rock formations and a narrow canyon that opens into deeper blue water. Often visited for its unique structure and marine life.',
    image:
      'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80',
    lat: 36.2045,
    lng: 29.6220,
  },
  {
    id: 'wreck',
    name: 'Plane Wreck',
    description:
      'A submerged aircraft intentionally placed for divers, offering a surreal and memorable experience. Great visibility and a clear structure make it ideal for exploration and photos.',
    image:
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1200&q=80',
    lat: 36.2018,
    lng: 29.6380,
  },
  {
    id: 'flying-fish',
    name: 'Flying Fish Reef',
    description:
      'A lively reef known for schools of fish and vibrant underwater textures. It’s a more relaxed dive with plenty to observe, especially for those who enjoy marine life.',
    image:
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=80',
    lat: 36.2135,
    lng: 29.6040,
  },
];
function SiteMarker({ site, isActive, onSelect }) {
  return (
    <button
      type="button"
      aria-label={`Show ${site.name}`}
      onClick={() => onSelect(site.id)}
      className={`dive-sites__marker ${isActive ? 'is-active' : ''}`}
      style={{ left: `${site.mapX}%`, top: `${site.mapY}%` }}
    >
      <MapPin className="dive-sites__marker-icon" />
    </button>
  );
}

export default function DiveSitesSection() {
  const [selectedId, setSelectedId] = useState(DIVE_SITES[0].id);
  const [locked, setLocked] = useState(false);

  const selectedSite = useMemo(
    () => DIVE_SITES.find((site) => site.id === selectedId) ?? DIVE_SITES[0],
    [selectedId]
  );

  const selectedIndex = DIVE_SITES.findIndex((site) => site.id === selectedSite.id);

  function showPreviousSite() {
    const previousIndex = selectedIndex === 0 ? DIVE_SITES.length - 1 : selectedIndex - 1;
    setSelectedId(DIVE_SITES[previousIndex].id);
  }

  function showNextSite() {
    const nextIndex = selectedIndex === DIVE_SITES.length - 1 ? 0 : selectedIndex + 1;
    setSelectedId(DIVE_SITES[nextIndex].id);
  }
 useEffect(() => {
    const onScroll = () => {
      const intro = document.querySelector(".dive-sites__intro");
      if (!intro) return;

      const rect = intro.getBoundingClientRect();

      // when intro scrolls out of view
      setLocked(rect.bottom <= 0);
    }; 
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className={`dive-sites ${locked ? "is-locked" : ""}`}>
      <div className="dive-sites__container">
        <div className="dive-sites__intro">
          <p className="dive-sites__eyebrow">Dive Sites</p>
          <h2 className="dive-sites__title">
            Explore the waters we return to again and again.
          </h2>
          <p className="dive-sites__lead">
            Browse a few of our favorite locations, see where they sit on the map,
            and get a feel for the kind of dives each site offers.
          </p>
        </div>

        <div className="dive-sites__layout">
          <div className="dive-sites__map-shell">
           <MapContainer
  center={[36.201, 29.637]} // Kas area approx
  zoom={12}
  scrollWheelZoom={false}
  className="dive-sites__map-stage"
>
  <TileLayer
    attribution='&copy; OpenStreetMap'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {DIVE_SITES.map(site => (
    <Marker
      key={site.id}
      position={[site.lat, site.lng]}
      eventHandlers={{
        click: () => setSelectedId(site.id)
      }}
    />
  ))}
</MapContainer>
          </div>

          <article className="dive-sites__card">
            <div className="dive-sites__card-image-wrap">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                className="dive-sites__card-image"
              />
              <div className="dive-sites__card-image-overlay" />
            </div>

            <div className="dive-sites__card-body">
              <div className="dive-sites__card-header">
                <div>
                  <h3 className="dive-sites__card-title">{selectedSite.name}</h3>
                </div>

                <div className="dive-sites__card-controls">
                  <button
                    type="button"
                    aria-label="Show previous site"
                    onClick={showPreviousSite}
                    className="dive-sites__card-control"
                  >
                    <ChevronLeft className="dive-sites__card-control-icon" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show next site"
                    onClick={showNextSite}
                    className="dive-sites__card-control"
                  >
                    <ChevronRight className="dive-sites__card-control-icon" />
                  </button>
                </div>
              </div>

              <p className="dive-sites__card-text">{selectedSite.description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
