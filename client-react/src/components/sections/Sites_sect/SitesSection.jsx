import React, { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
const officeIcon = L.icon({
  iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
 shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],})

function DivingSitesSection({ section }) {
  const [selectedId, setSelectedId] = useState(null);
  const [locked, setLocked] = useState(false);
  const [expandedText, setExpandedText] = useState(null);

  const sites = useMemo(() => {
  if (!section?.blocks) return [];

  const listBlock = section.blocks.find(
    b => b.block_type === 'list'
  );

  return (
    listBlock?.dive_sites?.map(site => {
      const isVideo = site.image?.toLowerCase().includes('.mp4');

      return {
        id: site.id,
        title: site.name,
        description: site.description,
        media: {
          type: isVideo ? 'video' : 'image',
          src: site.image,
        },
        lat: site.lat ?? 36.20,
        lng: site.lng ?? 29.60,
      };
    }) ?? []
  );
}, [section]);

  useEffect(() => {
    if (sites.length && !selectedId) {
      setSelectedId(sites[0].id);
    }
  }, [sites, selectedId]);

  const selectedSite = useMemo(() => {
    return sites.find(s => s.id === selectedId) || sites[0];
  }, [sites, selectedId]);

  const selectedIndex = sites.findIndex(
    s => s.id === selectedSite?.id
  );

  function showPreviousSite() {
    const prev =
      selectedIndex === 0
        ? sites.length - 1
        : selectedIndex - 1;

    setSelectedId(sites[prev].id);
  }

  function showNextSite() {
    const next =
      selectedIndex === sites.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedId(sites[next].id);
  }

  useEffect(() => {
    const onScroll = () => {
      const intro = document.querySelector(
        '.dive-sites__intro'
      );

      if (!intro) return;

      const rect = intro.getBoundingClientRect();
      setLocked(rect.bottom <= 0);
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener('scroll', onScroll);
  }, []);

  if (!sites.length || !selectedSite) return null;

  return (
    <section
      className={`dive-sites ${
        locked ? 'is-locked' : ''
      }`}
    >
      <div className="dive-sites__container">
        <div className="dive-sites__intro">
          <p className="dive-sites__eyebrow">
            Dive Sites
          </p>

          <h2 className="dive-sites__title">
            Explore the waters we return to again and again.
          </h2>

          <p className="dive-sites__lead">
            Browse a few of our favorite locations, see where
            they sit on the map, and get a feel for the kind
            of dives each site offers.
          </p>
        </div>

        <div className="dive-sites__layout">
          <div className="dive-sites__map-shell">
            <MapContainer
              center={[36.8884457, 30.6431361]}
              zoom={12}
              scrollWheelZoom={false}
              className="dive-sites__map-stage"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
<Marker
    position={[36.83492825944246, 30.60686843453962]}
    icon={officeIcon}
  />
              {sites.map(site => (
                <Marker
                  key={site.id}
                  position={[site.lat, site.lng]}
                  eventHandlers={{
                    click: () => setSelectedId(site.id),
                  }}
                />
              ))}
            </MapContainer>
          </div>

          <article className="dive-sites__card">
            <div className="dive-sites__card-image-wrap">
             {selectedSite.media?.type === 'video' ? (
  <video
    src={selectedSite.media.src}
    className="dive-sites__card-image"
    autoPlay
    muted
    loop
    playsInline
  />
) : (
  <img
    src={selectedSite.media?.src}
    alt={selectedSite.title}
    className="dive-sites__card-image"
  />
)}

              <div className="dive-sites__card-image-overlay" />
            </div>

            <div className="dive-sites__card-body">
              <div className="dive-sites__card-header">
                <h3 className="dive-sites__card-title">
                  {selectedSite.title}
                </h3>

                <div className="dive-sites__card-controls">
                  <button onClick={showPreviousSite}>
                    <ChevronLeft />
                  </button>

                  <button onClick={showNextSite}>
                    <ChevronRight />
                  </button>
                </div>
              </div>

          <p style={{ whiteSpace: 'pre-line', display: 'block' }} className="dive-sites__card-text">
  {selectedSite.description
    ?.replace(/\\n/g, '\n')
    .slice(0, 180)}

  {selectedSite.description?.length > 180 && (
    <>
      ...{' '}
      <button
        onClick={() =>
          setExpandedText(
            selectedSite.description?.replace(/\\n/g, '\n')
          )
        }
        className="dive-sites__read-more"
      >
        read more
      </button>
    </>
  )}
</p>
            </div>
          </article>
        </div>
      </div>
      {expandedText && (
  <div
    className="dive-sites__modal-overlay"
    onClick={() => setExpandedText(null)}
  >
    <div
      className="dive-sites__modal"
      onClick={(e) => e.stopPropagation()}
    >
       <button onClick={() => setExpandedText(null)}>
        X
      </button>
      <p>{expandedText}</p>

     
    </div>
  </div>
)}
    </section>
  );
}

export default DivingSitesSection;