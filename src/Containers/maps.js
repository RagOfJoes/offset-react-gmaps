import Map from "../views/Map";
import Card from "../views/Card/Card";
import { Popup } from "react-map-gl";
import Section from "../views/Section";
import Marker from "../views/Marker/Marker";
import React, { useState } from "react";
import { sections } from "../config/regions";
import useScroll from "../config/isScrolling";
import InfoWindow from "../views/InfoWindow";
import PointMarker from "../views/Marker/PointMarker";
import { mapOptions } from "../config/mapOptions";
import { vineyardNames, coordinates } from "../config/coords";
import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";

const checkCoord = (startLat, startLng, endLat, endLng) => {
	return (
		Number(startLat).toPrecision(5) === endLat.toPrecision(5) &&
		Number(startLng).toPrecision(5) === endLng.toPrecision(5)
	);
};

const handleMapPan = (endLan, endLng, handlePopup, handleViewport) => {
	handlePopup(true);
	handleViewport(prevState => ({
		...prevState,
		latitude: endLan,
		longitude: endLng,
		transitionDuration: 1200,
		transitionInterpolator: new FlyToInterpolator(),
		transitionInterruption: TRANSITION_EVENTS.UPDATE
	}));
};

const renderMarker = (
	vineyardName,
	vineyard,
	vineyardCard,
	isLoaded,
	isMobile,
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
						if (isLoaded && !isMoving) {
							handleMapPan(lat, lng, togglePopup, changeViewport);
						}

						vineyardCard.scrollIntoView({ inline: "center", block: "center" });
					}}
				/>
			</Marker>
			{checkCoord(latitude, longitude, lat, lng) && isPopupOpen && !isMobile ? (
				<Popup
					closeOnClick
					offsetTop={10}
					latitude={lat}
					longitude={lng}
					offsetLeft={10}
					dynamicPosition={false}
					onClose={() => togglePopup(false)}>
					<InfoWindow image={image} region={vineyardName} description={location} />
				</Popup>
			) : null}
		</React.Fragment>
	);
};

const App = React.memo(() => {
	const [isMobile, setMobile] = useState(false);
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(true);
	const [viewport, changeViewport] = useState(mapOptions);

    // Viewport
	const { latitude, longitude } = viewport;

    // Track scroll element
	const scrollElem = React.useRef(null);
	useScroll(scrollElem);

    // Track window width to determine whether or not to use mobile
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
                    mapStyle="mapbox://styles/victorfigure/cjz0v85ya62js1cp78ox6765k?optimize=true"
					changeView={viewport => changeViewport(viewport)}
					mapLoaded={() => (isLoaded ? null : setMapLoaded(true))}
					onTransition={trans => {
						changeMoving(trans);
					}}>
					{vineyardNames.map(vineyard => {
						const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];

						return renderMarker(
							vineyard,
							coordinates[vineyard],
							vineyardCard,
							isLoaded,
							isMobile,
							isMoving,
							isPopupOpen,
							togglePopup,
							changeViewport,
							viewport
						);
					})}
				</Map>
			</div>
		</>
	);
});

export default App;
