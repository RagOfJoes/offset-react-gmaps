import React from "react";
import { Marker } from "react-map-gl";

/**
 * Custom Marker Component using react-map-gl by @author [uber](https://github.com/uber/react-map-gl) that allows for custom marker style
 * 
 * @param {object} props Required Component Properties
 */
const CustomMarker = props => {
	const { lat, lng, offsetTop, offsetLeft } = props;
	return (
		<Marker anchor="bottom" latitude={lat} longitude={lng} offsetTop={offsetTop} offsetLeft={offsetLeft}>
			{props.children}
		</Marker>
	);
};

export default CustomMarker;
