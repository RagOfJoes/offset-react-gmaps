import { forwardRef } from 'react';

import MapGL, { MapProps as MapGLProps, MapRef } from 'react-map-gl';

const Map = forwardRef<MapRef, MapGLProps>((props, ref) => {
  // eslint-disable-next-line
  const { fog, terrain, ...other } = props;

  return (
    <MapGL
      ref={ref}
      reuseMaps
      preserveDrawingBuffer
      attributionControl={false}
      {...other}
      testMode={import.meta.env.DEV}
      mapboxAccessToken={import.meta.env.VITE_MAP_GL_API_KEY}
    />
  );
});

export default Map;
