import React, { useEffect, useMemo, useRef, useState } from 'react';

import { MapRef, Popup, ViewState } from 'react-map-gl';
import { useParams } from 'react-router-dom';

import Cards from './Cards';
import InfoWindow, { InfoWindowProps } from '@/components/InfoWindow';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import useIsMobile from '@/hooks/useIsMobile';
import { regions, vineyards } from '@/lib/constants';
import isCoordinatesEqual from '@/lib/isCoordinatesEqual';

const initialViewState: ViewState = {
  zoom: 9,
  pitch: 65,
  bearing: 340,
  latitude: 45.2825284,
  longitude: -123.0408265,
  padding: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Vineyards = () => {
  const { region } = useParams();
  const isMobile = useIsMobile();

  const mapRef = useRef<MapRef>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [tab, setTab] = useState(0);
  const [isLoaded, toggleIsLoaded] = useState(false);
  const [isPanning, toggleIsPanning] = useState(false);
  const [popup, setPopup] = useState<
    (InfoWindowProps & Pick<ViewState, 'latitude' | 'longitude'>) | null
  >(null);

  const Markers = useMemo(() => {
    if (!region || !regions[region]) {
      return null;
    }

    return regions[region]!.vineyards.map((vineyard) => {
      const { lat, lng } = vineyards[vineyard as keyof typeof vineyards];

      const fill =
        !!popup &&
        isCoordinatesEqual(
          { lat, lng },
          { lat: popup.latitude, lng: popup.longitude }
        )
          ? '#618549'
          : '#978A5E';

      return (
        <Marker
          fill={fill}
          key={vineyard}
          latitude={lat}
          longitude={lng}
          onClick={() => {
            if (!isLoaded) {
              return;
            }

            document.querySelectorAll('[data-vineyard]').forEach((node) => {
              if (node.getAttribute('data-vineyard') === vineyard) {
                node.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center',
                });
              }
            });
          }}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, popup]);

  // On map laod
  // - Resize map to ensure map has proper dimensions
  // - Pan to first vineyard
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !region || !regions[region]) {
      return;
    }

    mapRef.current.resize();

    const firstVineyard = regions[region]!.vineyards[0]!;
    const { image, lat, lng, location, slug } = vineyards[firstVineyard];

    toggleIsPanning(true);
    mapRef.current.panTo({ lat, lng });
    setPopup({
      image,
      location,
      latitude: lat,
      slug,
      longitude: lng,
      vineyard: firstVineyard,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, mapRef.current]);

  if (!region || !regions[region]) {
    return (
      <div className="invalidRegion" data-reason="INVALID REGION!">
        <h2>INVALID REGION!</h2>
      </div>
    );
  }

  return (
    <>
      <div
        ref={scrollRef}
        className={
          isMobile && tab === 1 ? 'scroll-places-list' : 'scroll-places-row'
        }
      >
        <div className="section-row">
          <h1 className="region-name">{regions[region]!.sectionTitle}</h1>
          <p className="appellations">
            <strong>APPELLATIONS: </strong>
            {regions[region]!.appellations}
          </p>
          <p className="appellation-description">
            {regions[region]!.description}
          </p>
        </div>
        <div className="section-card-row section-row">
          <Cards
            isLoaded={isLoaded}
            isPanning={isPanning}
            mapRef={mapRef}
            setPopup={setPopup}
            scrollRef={scrollRef}
            toggleIsPanning={toggleIsPanning}
            vineyards={regions[region]!.vineyards}
          />
        </div>
      </div>

      <Map
        minZoom={6}
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/silveroak/cl6dr0ipq002614qpgglswo8q"
        onMoveStart={() => setPopup(null)}
        onLoad={() => toggleIsLoaded(true)}
        style={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? 'calc(65vh - 40px)' : '100vh',
          display: isMobile && tab === 1 ? 'none' : 'block',
        }}
        padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onDragStart={() => {
          setPopup(null);
          toggleIsPanning(false);
        }}
        onMoveEnd={(e) => {
          if (!isLoaded || !popup) {
            return;
          }

          const center = e.target.getCenter();
          if (
            isCoordinatesEqual(
              { lat: center.lat, lng: center.lng },
              { lat: popup.latitude, lng: popup.longitude }
            )
          ) {
            toggleIsPanning(false);
          }
        }}
      >
        {!isMobile && !isPanning && !!popup && (
          <Popup
            maxWidth="none"
            anchor="bottom"
            offset={[0, -10]}
            closeOnClick={false}
            latitude={popup.latitude}
            longitude={popup.longitude}
            onClose={() => setPopup(null)}
          >
            <InfoWindow {...popup} />
          </Popup>
        )}

        {Markers}
      </Map>

      <div className="scroll-tabs">
        <div className="tabTitle">
          <h1 style={tab === 0 ? {} : { width: 0 }}>
            {regions[region]!.sectionTitle}
          </h1>
        </div>
        <div className="tabsContainer">
          <div
            onClick={() => setTab(0)}
            className="mapTabContainer"
            style={tab === 0 ? { borderBottom: '2px solid #A69C80' } : {}}
          >
            <h3 className="mapTab">View As Map</h3>
          </div>
          <div
            onClick={() => setTab(1)}
            className="listTabContainer"
            style={tab === 1 ? { borderBottom: '2px solid #A69C80' } : {}}
          >
            <h3 className="listTab">View As List</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vineyards;
