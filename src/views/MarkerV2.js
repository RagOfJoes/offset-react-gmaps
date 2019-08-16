import React from "react";
import { Marker } from "react-map-gl";

const MarkerV2 = props => {
	const { lat, lng, offsetTop, offsetLeft } = props;
	return (
		<Marker anchor="bottom" latitude={lat} longitude={lng} offsetTop={offsetTop} offsetLeft={offsetLeft}>
			{props.children}
		</Marker>
	);
};

export default MarkerV2;
