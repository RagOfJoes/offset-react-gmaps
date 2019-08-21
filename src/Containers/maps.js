import Map from "../views/Map";
import Card from "../views/Card/Card";
import { Popup } from "react-map-gl";
import Section from "../views/Section";
import React, { useState } from "react";
import Marker from "../views/Marker/Marker";
import { sections } from "../config/regions";
import InfoWindow from "../views/InfoWindow";
import useScroll from "../config/isScrolling";
import { mapOptions } from "../config/mapOptions";
import PointMarker from "../views/Marker/PointMarker";
import { toPrecise } from "../views/Card/config";
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
	vineyardCard,
	vineyardLink,
	isLoaded,
	isMobile,
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

							vineyardCard.scrollIntoView({ inline: "center", block: "center" });
						}
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
					<InfoWindow image={image} region={vineyardName} link={vineyardLink} description={location} />
				</Popup>
			) : null}
		</React.Fragment>
	);
};

const useNodeRef = () => {
	const [node, setNode] = useState(null);

	const ref = React.useCallback(node => {
		setNode(node);
	}, []);
	return [node, ref];
};

const App = React.memo(() => {
	const [node, setNode] = useNodeRef(null);
	const [isMobile, setMobile] = useState(true);
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(true);
	const [viewport, changeViewport] = useState(mapOptions);

	// Viewport
	const { latitude, longitude } = viewport;

	// Track scroll element
	useScroll(node);

	// Track window width to determine whether or not to use mobile
	if (window.innerWidth <= 767.8 && !isMobile) {
		setMobile(true);
	} else if (window.innerWidth >= 767.8 && isMobile) {
		setMobile(false);
	}

	return (
		<>
			<div className="scroll-places-row" ref={setNode}>
				{sections.map(section => {
					const { sectionTitle, appellations, description } = section;
					return (
						<Section
							key={sectionTitle}
							title={sectionTitle}
							description={description}
							appellations={appellations}>
							{section.vineyardNames.map(vineyard => {
								const { lat, lng, image, caption, location } = coordinates[vineyard]; // Get vineyard's info

								// Creates Card Link
								const cardLink = `${vineyard.replace(/\s+/g, "-").toLowerCase()}`;
								return (
									<Card
										key={vineyard}
										title={vineyard}
										caption={caption}
										cardImage={image}
										location={location}
										isMobile={isMobile}
										cardLink={cardLink}
										isMapMoving={isMoving}
										position={{ lat, lng }}
										scrollElem={node}
										mapCenter={{ latitude, longitude }}
										cardClick={(lat, lng) => {
											if (isLoaded && !isMoving) {
												handleMapPan(lat, lng, changeViewport);
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
					height={isMobile ? "65vh" : "100vh"}
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
						const cardLink = `${vineyard.replace(/\s+/g, "-").toLowerCase()}`;
						const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];

						return renderMarker(
							vineyard,
							coordinates[vineyard],
							vineyardCard,
							cardLink,
							isLoaded,
							isMobile,
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
