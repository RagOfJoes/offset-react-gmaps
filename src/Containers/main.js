import React, { useState } from "react";
import Map from "../views/MapV2";
import Marker from "../views/MarkerV2";
import { mainMapOptions } from "../config/mapOptions";
import { regionNames, coordinates } from "../config/regionCoords";
import LabelMarker from "../views/LabelMarker";
const App = React.memo(() => {
	const [viewport, changeViewport] = useState(mainMapOptions);
	const [isMoving, changeMoving] = useState(false);
	const [isMapLoaded, mapLoaded] = useState(false);
	return (
		<Map
			width="100vw"
			height="100vh"
			viewport={viewport}
			mapLoaded={() => (!isMapLoaded ? mapLoaded(true) : null)}
			onTransition={moving => changeMoving(moving)}
			changeView={viewport => changeViewport(viewport)}>
			{regionNames.map(region => {
				const { lat, lng } = coordinates[region];
				return (
					<Marker lat={lat} lng={lng} key={region} offsetTop={-40} offsetLeft={-100}>
						<LabelMarker title={region} />
					</Marker>
				);
			})}
		</Map>
	);
});

export default App;
