import { forwardRef } from "react";

import MapGL, { MapProps as MapGLProps, MapRef } from "react-map-gl";

export const Map = forwardRef<MapRef, MapGLProps>((props, ref) => {
	// eslint-disable-next-line
	const { fog, terrain, ...other } = props;

	return (
		<MapGL
			ref={ref}
			attributionControl={false}
			preserveDrawingBuffer
			reuseMaps
			{...other}
			mapboxAccessToken={import.meta.env.VITE_MAP_GL_API_KEY}
			testMode={import.meta.env.DEV}
		/>
	);
});
