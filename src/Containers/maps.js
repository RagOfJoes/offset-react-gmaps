import Map from '../views/Map';
import Tabs from './Components/Tabs';
import Section from '../views/Section';
import React, { useState } from 'react';
import { coordinates } from '../config/coords';
import useScroll from '../config/scrollingHook';
import { mapOptions } from '../config/mapOptions';
import RenderCards from './Components/RenderCards';
import useWindowSize from '../config/windowSIzeHook';
import { handleMapPan } from './config/handleMapPan';
import { useNodeRef } from './config/refWithCallback';
import RenderMarkers from './Components/RenderMarkers';

const App = props => {
	// States
	const [tab, toggleTab] = useState(1);
	const [node, setNode] = useNodeRef(null);
	const [isMobile, setMobile] = useState(false);
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(true);
	const [viewport, changeViewport] = useState(mapOptions);

	// Props
	const { region } = props;

	// Track scroll element
	useScroll(node);

	// Listen to window resize
	const windowSize = useWindowSize();
	if (windowSize.width < 767.8 && !isMobile) {
		toggleTab(1);
		setMobile(true);
	} else if (windowSize.width >= 767.8 && isMobile) {
		toggleTab(1);
		setMobile(false);
	}

	if (region) {
		const { sectionTitle, appellations, description, vineyards } = region;
		return (
			<>
				<div className={isMobile && tab === 2 ? `scroll-places-list` : `scroll-places-row`} ref={setNode}>
					<Section key={sectionTitle} title={sectionTitle} description={description} appellations={appellations}>
						<RenderCards
							section={region}
							scrollElem={node}
							isList={tab === 2}
							isMobile={isMobile}
							isMoving={isMoving}
							viewport={viewport}
							onClick={(endLat, endLng) => {
								if (isLoaded && !isMoving) {
									handleMapPan(endLat, endLng, changeViewport);
								}
							}}
						/>
					</Section>
				</div>
				<div
					className="scroll-map-container"
					style={isMobile ? (tab === 1 ? null : { width: '0px', height: '0px', display: 'none' }) : null}>
					<Map
						width="100%"
						viewport={viewport}
						height={isMobile ? '65vh' : '100vh'}
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
						<RenderMarkers
							isMobile={isMobile}
							viewport={viewport}
							vineyards={vineyards}
							isPopupOpen={isPopupOpen}
							togglePopup={togglePopup}
							coordinates={coordinates}
							onClick={(endLat, endLng, card) => {
								if (isLoaded) {
									handleMapPan(endLat, endLng, changeViewport);
									if (!isPopupOpen) {
										togglePopup(true);
									}

									card.scrollIntoView({ block: 'center', inline: 'center' });
								}
							}}
						/>
					</Map>
				</div>
				<Tabs region={sectionTitle} tab={tab} toggleTab={toggleTab} />
			</>
		);
	} else {
		return (
			<div className="invalidRegion" data-reason="INVALID REGION!">
				<h2>INVALID REGION!</h2>
			</div>
		);
	}
};

export default App;
