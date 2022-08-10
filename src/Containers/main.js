import Map from '../views/Map';
import React, { useState } from 'react';
import { sections } from '../config/regions';
import { coordinates } from '../config/coords';
import { NavigationControl } from 'react-map-gl';
import { handleMapPan } from './config/handleMapPan';
import { mainMapOptions } from '../config/mapOptions';
import RenderMarkers from './Components/RenderMarkers2';

const App = React.memo(() => {
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(false);
	const [viewport, changeViewport] = useState(mainMapOptions);

	return (
		<div className="main-map-container">
			<Map
				width="100vw"
				height="100vh"
				viewport={viewport}
				mapStyle="mapbox://styles/silveroak/cl6dr0ipq002614qpgglswo8q"
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
				<div className="navControl">
					<NavigationControl showZoom showCompass={false} />
				</div>
				{Object.keys(sections).map(section => {
					const { sectionTitle, vineyards } = sections[section];
					return (
						<RenderMarkers
							key={section}
							viewport={viewport}
							region={sectionTitle}
							vineyards={vineyards}
							isPopupOpen={isPopupOpen}
							togglePopup={togglePopup}
							coordinates={coordinates}
							onClick={(endLat, endLng) => {
								if (isLoaded) {
									handleMapPan(endLat, endLng, changeViewport);

									if (!isPopupOpen) {
										togglePopup(true);
									}
								}
							}}
						/>
					);
				})}
			</Map>
		</div>
	);
});

export default App;
