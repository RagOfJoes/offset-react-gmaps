import Map from '../views/Map';
import React, { useState } from 'react';
import { mainMapOptions } from '../config/mapOptions';
import RenderMarkers from './Components/RenderMarkers2';
import { vineyardNames, coordinates } from '../config/coords';
import { handleMapPan } from './config/handleMapPan';
import { checkCoord } from './config/checkCoords';

const App = React.memo(() => {
	const [isLoaded, setMapLoaded] = useState(false);
	const [isMoving, changeMoving] = useState(false);
	const [isPopupOpen, togglePopup] = useState(false);
	const [viewport, changeViewport] = useState(mainMapOptions);

	const { latitude, longitude } = viewport;

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
				<RenderMarkers
					viewport={viewport}
					isPopupOpen={isPopupOpen}
					togglePopup={togglePopup}
					vineyards={vineyardNames}
					coordinates={coordinates}
					onClick={(endLat, endLng) => {
						if (isLoaded) {
							handleMapPan(endLat, endLng, changeViewport);

							if (!isPopupOpen && checkCoord(latitude, longitude, endLat, endLng)) {
								togglePopup(true);
							}
						}
					}}
				/>
			</Map>
		</div>
	);
});

export default App;
