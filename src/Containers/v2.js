import Map from "../views/MapV2";
import Card from "../views/Cardv2";
import { Popup } from "react-map-gl";
import Section from "../views/Section";
import Marker from "../views/MarkerV2";
import React, { useState } from "react";
import { sections } from "../config/regions";
import InfoWindow from "../views/InfoWindowV2";
import useScroll from "../config/isScrolling";
import { mapOptions } from "../config/mapOptions";
import { vineyardNames, coordinates } from "../config/coords";
import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";
import PointMarker from "../views/PointMarker";

const handleMapPan = (endLan, endLng, handlePopup, handleViewport) => {
	handlePopup(true);
	handleViewport(prevState => ({
		...prevState,
		latitude: endLan,
		longitude: endLng,
		transitionDuration: 1300,
		transitionInterpolator: new FlyToInterpolator(),
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	}));
};

const V2 = React.memo(() => {
	const [isMobile, setMobile] = useState(false);
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(true);
	const [viewport, changeViewport] = useState(mapOptions);
	const { latitude, longitude } = viewport;

	const scrollElem = React.useRef(null);
	useScroll(scrollElem);

	if (window.innerWidth <= 767.8 && !isMobile) {
		setMobile(true);
	} else if (window.innerWidth >= 767.8 && isMobile) {
		setMobile(false);
	}

	return (
		<>
			<div className="scroll-places-row" ref={scrollElem}>
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
										isMobile={isMobile}
										isMapMoving={isMoving}
										position={{ lat, lng }}
										scrollElem={scrollElem.current}
										mapCenter={{ latitude, longitude }}
										cardClick={(lat, lng) => {
											if (isLoaded && !isMoving) {
												handleMapPan(lat, lng, togglePopup, changeViewport);
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
					width="100%"
					viewport={viewport}
					height={isMobile ? "55vh" : "100vh"}
					mapLoaded={() => setMapLoaded(true)}
					changeView={viewport => changeViewport(viewport)}
					onTransition={trans => {
						changeMoving(trans);
					}}>
					{vineyardNames.map(vineyard => {
						const { lat, lng, image, location } = coordinates[vineyard];
						const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];

						return (
							<React.Fragment key={vineyard}>
								<Marker lat={lat} lng={lng} offsetTop={-30} offsetLeft={-12}>
									<PointMarker
										fill={
											Number(latitude).toPrecision(5) === lat.toPrecision(5) &&
											Number(longitude).toPrecision(5) === lng.toPrecision(5)
												? "#618549"
												: "#A69C80"
										}
										onClick={() => {
											if (isLoaded && !isMoving) {
												handleMapPan(lat, lng, togglePopup, changeViewport);
											}

											vineyardCard.scrollIntoView({ inline: "center", block: "center" });
										}}
									/>
								</Marker>
								{Number(latitude).toPrecision(5) === lat.toPrecision(5) &&
								Number(longitude).toPrecision(5) === lng.toPrecision(5) &&
								isPopupOpen &&
								!isMobile ? (
									<Popup
										closeOnClick
										offsetTop={10}
										latitude={lat}
										longitude={lng}
										offsetLeft={10}
										dynamicPosition={false}
										onClose={() => togglePopup(false)}>
										<InfoWindow image={image} region={vineyard} description={location} />
									</Popup>
								) : null}
							</React.Fragment>
						);
					})}
				</Map>
			</div>
		</>
	);
});

export default V2;
