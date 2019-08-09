import React from "react";
import MapGL from "react-map-gl";

const MapV2 = React.memo(props => {
	const { viewport, changeView, mapLoaded, onTransition } = props;
	return (
		<MapGL
			reuseMap
			reuseMaps
			{...viewport}
			width="100%"
			height="100vh"
			preserveDrawingBuffer
			onLoad={() => mapLoaded(true)}
			onViewportChange={viewport => {
				changeView(viewport);
			}}
			onInteractionStateChange={interactionState => {
				const { isZooming, inTransition } = interactionState;
				if (isZooming) {
					onTransition(isZooming);
				} else {
					onTransition(inTransition);
				}
			}}
			onTransitionEnd={() => onTransition(false)}
			onTransitionStart={() => onTransition(true)}
			mapboxApiAccessToken={process.env.REACT_APP_MAP_GL_API_KEY}
			mapStyle="mapbox://styles/victorfigure/cjz0v85ya62js1cp78ox6765k?optimize=true">
			{props.children}
		</MapGL>
	);
});

export default MapV2;
