import Map from "../views/Map";
import { Popup } from "react-map-gl";
import React, { useState } from "react";
import Marker from "../views/Marker/Marker";
import InfoWindow from "../views/InfoWindow";
import useScroll from "../config/isScrolling";
import { toPrecise } from "../views/Card/config";
import { mainMapOptions } from "../config/mapOptions";
import PointMarker from "../views/Marker/PointMarker";
import { vineyardNames, coordinates } from "../config/coords";
import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";

const checkCoord = (startLat, startLng, endLat, endLng) => {
	return toPrecise(startLat) === toPrecise(endLat) && toPrecise(startLng) === toPrecise(endLng);
};

const handleMapPan = (endLan, endLng, handleViewport) => {
	handleViewport(prevState => ({
		...prevState,
		latitude: endLan,
		longitude: endLng,
		transitionDuration: 1000,
		transitionInterpolator: new FlyToInterpolator(),
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	}));
};

const renderMarker = (
	vineyardName,
	vineyard,
	isLoaded,
	isMoving,
	isPopupOpen,
	togglePopup,
	changeViewport,
	{ latitude, longitude }
) => {
	const { lat, lng, image, location } = vineyard;

	const fill = checkCoord(latitude, longitude, lat, lng) ? "#618549" : "#A69C80";
	return (
		<React.Fragment key={vineyardName}>
			<Marker lat={lat} lng={lng} offsetTop={-30} offsetLeft={-12}>
				<PointMarker
					fill={fill}
					onClick={() => {
						if (isLoaded) {
							handleMapPan(lat, lng, changeViewport);

							if (!isPopupOpen && checkCoord(latitude, longitude, lat, lng)) {
								togglePopup(true);
							}
						}
					}}
				/>
			</Marker>
			{checkCoord(latitude, longitude, lat, lng) && isPopupOpen ? (
				<Popup
					// closeOnClick
					offsetTop={10}
					latitude={lat}
					longitude={lng}
					offsetLeft={10}
					dynamicPosition={true}
					onClose={() => togglePopup(false)}>
					<InfoWindow image={image} region={vineyardName} description={location} />
				</Popup>
			) : null}
		</React.Fragment>
	);
};

const App = React.memo(() => {
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(false);
	const [viewport, changeViewport] = useState(mainMapOptions);

	// Track scroll element
	const scrollElem = React.useRef(null);
	useScroll(scrollElem);

	return (
		<div className="main-map-container">
			<Map
				width="100vw"
				height="100vh"
				viewport={viewport}
				mapStyle="mapbox://styles/victorfigure/cjz0v85ya62js1cp78ox6765k?optimize=true"
				changeView={newView => changeViewport(newView)}
				mapLoaded={() => {
					if (!isLoaded) {
						setMapLoaded(true);
						changeMoving(false);
					}
				}}
				onTransition={trans => {
					if (trans !== isMoving) {
						changeMoving(trans);
					}
				}}>
				{vineyardNames.map(vineyard => {
					return renderMarker(
						vineyard,
						coordinates[vineyard],
						isLoaded,
						isMoving,
						isPopupOpen,
						togglePopup,
						changeViewport,
						viewport
					);
				})}
			</Map>
		</div>
	);
});

export default App;
