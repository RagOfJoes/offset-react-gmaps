import { forwardRef } from "react";

import MapGL, { MapProps as MapGLProps, MapRef } from "react-map-gl/mapbox";

export const Map = forwardRef<MapRef, MapGLProps>(({ fog, terrain, ...props }, ref) => {
	return (
		<MapGL
			ref={ref}
			attributionControl={false}
			preserveDrawingBuffer
			reuseMaps
			{...props}
			mapboxAccessToken={import.meta.env.VITE_MAP_GL_API_KEY}
			testMode={import.meta.env.DEV}
		/>
	);
});
