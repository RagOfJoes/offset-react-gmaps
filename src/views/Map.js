import React from 'react';
import MapGL from 'react-map-gl';

/**
 * Map View using react-map-gl Component by @author [uber](https://github.com/uber/react-map-gl)
 *
 * @param {object} props Required Component Properties
 *
 * @version 2.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 */
const MapV2 = React.memo(props => {
	const { width, height, mapStyle, viewport, changeView, mapLoaded, onTransition } = props;

	return (
		<MapGL
			// Optimization props
			reuseMap
			reuseMaps
			preserveDrawingBuffer
			attributionControl={false}
			// Viewport object *required*
			{...viewport}
			// Style *required*
			width={width}
			height={height}
			// Map functions to enable animations
			onLoad={() => mapLoaded(true)}
			onViewportChange={newView => changeView(newView)}
			// Enables Users to look around the map
			touchZoom={true}
			onMouseUp={() => onTransition(false)}
			// onMouseDown={() => onTransition(true)} might be interfering with the link
			onTouchEnd={() => onTransition(false)}
			// onTouchStart={() => onTransition(true)} might be interfering with the link
			// Tracks Map Transition
			onTransitionEnd={() => onTransition(false)}
			onTransitionStart={() => onTransition(true)}
			// Map Style and API token *required*
			mapboxApiAccessToken={process.env.REACT_APP_MAP_GL_API_KEY}
			mapStyle={mapStyle}>
			{/* props.children are for Markers and Popup windows | Anything on top of the map */}
			{props.children}
		</MapGL>
	);
});

export default MapV2;
