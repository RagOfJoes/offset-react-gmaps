import { useMemo, useRef, useState } from 'react';

import { MapRef, NavigationControl, Popup, ViewState } from 'react-map-gl';

import InfoWindow, { InfoWindowProps } from '@/components/InfoWindow';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import { vineyards } from '@/lib/constants';
import isCoordinatesEqual from '@/lib/isCoordinatesEqual';

const initialViewState: ViewState = {
  pitch: 65,
  zoom: 6.5,
  bearing: 340,
  latitude: 38.042,
  longitude: -122.081,
  padding: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Overview = () => {
  const ref = useRef<MapRef>(null);

  const [isLoaded, toggleIsLoaded] = useState(false);
  const [isPanning, toggleIsPanning] = useState(false);
  const [popup, setPopup] = useState<
    (InfoWindowProps & Pick<ViewState, 'latitude' | 'longitude'>) | null
  >(null);

  const Markers = useMemo(() => {
    return Object.keys(vineyards).map((vineyard) => {
      const { image, lat, lng, location, slug } =
        vineyards[vineyard as keyof typeof vineyards];
      return (
        <Marker
          key={vineyard}
          fill="#978A5E"
          latitude={lat}
          longitude={lng}
          onClick={async () => {
            if (!isLoaded) {
              return;
            }

            ref.current?.panTo([lng, lat], {
              duration: 1000,
            });

            toggleIsPanning(true);
            setPopup({
              image,
              location,
              latitude: lat,
              slug,
              longitude: lng,
              vineyard,
            });
          }}
        />
      );
    });
  }, [isLoaded]);

  return (
    <div className="main-map-container">
      <Map
        ref={ref}
        minZoom={6}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/silveroak/cl6dr0ipq002614qpgglswo8q"
        onMoveStart={() => setPopup(null)}
        onLoad={() => toggleIsLoaded(true)}
        style={{ width: '100vw', height: '100vh' }}
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
        <div className="navControl">
          <NavigationControl showZoom showCompass={false} />
        </div>

        {!isPanning && !!popup && (
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
    </div>
  );
};

export default Overview;
