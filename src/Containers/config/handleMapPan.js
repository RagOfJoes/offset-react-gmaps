import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";

export const handleMapPan = (endLan, endLng, handleViewport) => {
	handleViewport(prevState => ({
		...prevState,
		latitude: endLan,
		longitude: endLng,
		transitionDuration: 1000,
		transitionInterpolator: new FlyToInterpolator(),
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	}));
};