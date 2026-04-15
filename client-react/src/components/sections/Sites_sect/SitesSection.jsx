import React, { useMemo, useState } from 'react';
import { MapPin, Compass, ChevronLeft, ChevronRight } from 'lucide-react';


const DIVE_SITES = [
  {
    id: 'blue-cave',
    name: 'Blue Cave',
    description:
      'Blue Cave is one of the most atmospheric locations in the area, known for the way light filters through the rock and washes the water in shifting shades of blue. The site feels calm, open, and cinematic, making it one of the easiest places for visitors to immediately understand why this coastline is so memorable.',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    mapX: 28,
    mapY: 38,
  },
  {
    id: 'reef-garden',
    name: 'Reef Garden',
    description:
      'Reef Garden offers a softer, more colorful side of the region, with layered rock formations, lively marine life, and a landscape that feels rich without being overwhelming. It is the kind of site that rewards slower exploration and leaves people with a strong sense of the texture and beauty of the underwater environment.',
    image:
      'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80',
    mapX: 55,
    mapY: 26,
  },
  {
    id: 'arch-point',
    name: 'Arch Point',
    description:
      'Arch Point is centered around a striking natural rock formation that gives the site a more dramatic identity than the others. The surrounding water often feels clearer and more expansive, and the combination of stone shapes, open blue, and changing light makes it one of the most visually distinctive stops on the route.',
    image:
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1200&q=80',
    mapX: 71,
    mapY: 57,
  },
  {
    id: 'sunken-wall',
    name: 'Sunken Wall',
    description:
      'Sunken Wall has a darker, moodier character, with vertical drop-offs and a sense of depth that gives the entire site a more dramatic presence. It feels less like a simple stop and more like a place with its own atmosphere, which is exactly why it stays in people’s memory long after the boat ride back.',
    image:
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=80',
    mapX: 42,
    mapY: 71,
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

  return (
    <section className="dive-sites">
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
            <div className="dive-sites__map-stage">
              <div className="dive-sites__map-background" />

              <div className="dive-sites__map-frame">
                <svg
                  viewBox="0 0 1000 700"
                  className="dive-sites__map-svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="seaGlow" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#153754" />
                      <stop offset="100%" stopColor="#0a2032" />
                    </linearGradient>
                  </defs>

                  <rect x="0" y="0" width="1000" height="700" fill="url(#seaGlow)" />

                  <path
                    d="M82 110C150 98 246 130 305 170C360 207 413 229 461 221C525 211 582 148 655 132C731 116 834 149 902 197L902 600C847 579 779 572 715 587C656 601 618 631 562 637C485 645 435 610 374 583C318 558 251 538 189 546C144 551 108 566 82 581Z"
                    fill="rgba(226,232,240,0.11)"
                  />
                  <path
                    d="M156 177C225 165 310 195 365 236C416 273 462 291 514 284C586 274 638 213 706 202C772 191 847 216 903 258"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M182 495C248 472 300 476 363 504C421 530 467 563 533 566C595 569 646 532 706 515C771 496 835 500 892 529"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                    strokeDasharray="10 14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M122 620C187 593 264 591 332 612C401 634 451 668 516 667C595 666 646 617 721 606C790 596 850 609 902 636"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="2.5"
                    strokeDasharray="8 14"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="dive-sites__map-overlay" />

                {DIVE_SITES.map((site) => (
                  <SiteMarker
                    key={site.id}
                    site={site}
                    isActive={site.id === selectedSite.id}
                    onSelect={setSelectedId}
                  />
                ))}

                <div className="dive-sites__departure-tag">Departure Zone</div>

                <div className="dive-sites__map-footer">
                  <p className="dive-sites__map-name">{selectedSite.name}</p>
                  <div className="dive-sites__map-label">
                    <Compass className="dive-sites__map-label-icon" />
                    <span>Regional dive map</span>
                  </div>
                </div>
              </div>
            </div>
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
