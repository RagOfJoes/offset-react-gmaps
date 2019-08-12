import Map from "../views/MapV2";
import Card from "../views/Cardv2";
import { Popup } from "react-map-gl";
import Section from "../views/Section";
import Marker from "../views/MarkerV2";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sections } from "../config/regions";
import InfoWindow from "../views/InfoWindowV2";
import { bearing } from "../config/calcBearing";
import { isScrolling } from "../Redux/Actions/Map";
import { vineyardNames, coordinates } from "../config/coords";
import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";

const handleMapPan = (startLan, startLng, endLan, endLng, handlePopup, handleViewport) => {
	let nextBearing;
	if (endLng > startLng) {
		nextBearing = bearing(startLan, startLng, endLan, endLng);
	} else {
		nextBearing = bearing(endLan, endLng, startLan, startLng);
	}
	handlePopup(true);
	handleViewport(prevState => ({
		...prevState,
		latitude: endLan,
		longitude: endLng,
		transitionDuration: 1500,
		// bearing: Math.round(nextBearing),
		transitionInterpolator: new FlyToInterpolator(),
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	}));
};

const V2 = React.memo(() => {
	const dispatch = useDispatch();
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(true);
	const [viewport, changeViewport] = useState({
		zoom: 9,
		pitch: 65,
		bearing: 340,
		latitude: 45.2825284,
		longitude: -123.0408265,
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	});
	const { latitude, longitude } = viewport;
	const scrollElem = document.getElementsByClassName("scroll-places-row")[0];
	return (
		<div className="App">
			<div className="scroll-places-row" onScroll={() => dispatch(isScrolling(true))}>
				{sections.map(section => {
					const { sectionTitle, appellations } = section;
					return (
						<Section key={sectionTitle} title={sectionTitle} appellations={appellations}>
							{section.vineyardNames.map(vineyard => {
								const { lat, lng, image, caption, location } = coordinates[vineyard]; // Get vineyard's info
								return (
									<Card
										key={vineyard}
										title={vineyard}
										caption={caption}
										cardImage={image}
										location={location}
										position={{ lat, lng }}
										scrollElem={scrollElem}
										mapCenter={{ latitude, longitude }}
										cardClick={(lat, lng) => {
											if (isLoaded && !isMoving) {
												handleMapPan(
													latitude,
													longitude,
													lat,
													lng,
													togglePopup,
													changeViewport
												);
											}
										}}
									/>
								);
							})}
						</Section>
					);
				})}
			</div>
			<div className="scroll-map-container">
				<Map
					viewport={viewport}
					mapLoaded={() => setMapLoaded(true)}
					changeView={viewport => changeViewport(viewport)}
					onTransition={trans => {
						changeMoving(trans);
					}}>
					{vineyardNames.map(vineyard => {
						const { lat, lng, location } = coordinates[vineyard];
						const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];

						if (!vineyard.includes("Estate") && !vineyard.includes("Ranch")) {
							vineyard = vineyard.concat(" Vineyard");
						}

						return (
							<React.Fragment key={vineyard}>
								<Marker
									lat={lat}
									lng={lng}
									isFocused={
										Number(latitude).toPrecision(10) === lat.toPrecision(10) &&
										Number(longitude).toPrecision(10) === lng.toPrecision(10)
									}
									moveToMarker={(lat, lng) => {
										if (isLoaded && !isMoving) {
											handleMapPan(latitude, longitude, lat, lng, togglePopup, changeViewport);
										}
										vineyardCard.scrollIntoView();
									}}
								/>
								{Number(latitude).toPrecision(10) === lat.toPrecision(10) &&
								Number(longitude).toPrecision(10) === lng.toPrecision(10) &&
								isPopupOpen ? (
									<Popup
										offsetTop={10}
										closeOnClick
										latitude={lat}
										longitude={lng}
										offsetLeft={10}
										dynamicPosition={false}
										onClose={() => togglePopup(false)}>
										<InfoWindow region={vineyard} description={location} />
									</Popup>
								) : null}
							</React.Fragment>
						);
					})}
				</Map>
			</div>
		</div>
	);
});

export default V2;
