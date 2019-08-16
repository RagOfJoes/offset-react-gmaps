import Map from "../views/Map";
import React, { useState } from "react";
import Marker from "../views/Marker/Marker";
import { NavigationControl } from "react-map-gl";
import { mainMapOptions } from "../config/mapOptions";
import LabelMarker from "../views/Marker/LabelMarker";
import { regionNames, coordinates } from "../config/regionCoords";

const App = React.memo(() => {
	const [isMoving, changeMoving] = useState(false);
	const [isMapLoaded, mapLoaded] = useState(false);
	const [viewport, changeViewport] = useState(mainMapOptions);
	return (
		<Map
			width="100vw"
			height="100vh"
			viewport={viewport}
			mapStyle="mapbox://styles/victorfigure/cjz0v85ya62js1cp78ox6765k?optimize=true"
			onTransition={() => changeMoving(!isMoving)}
			changeView={viewport => changeViewport(viewport)}
			mapLoaded={() => (!isMapLoaded ? mapLoaded(true) : null)}>
			{regionNames.map(region => {
				const { lat, lng } = coordinates[region];
				return (
					<Marker lat={lat} lng={lng} key={region} offsetTop={-40} offsetLeft={-100}>
						<LabelMarker title={region} />
					</Marker>
				);
			})}
			<div style={{position: "absolute", bottom: "5%", left: "5%", zIndex: 100}}>
				<NavigationControl showCompass={false} />
			</div>
		</Map>
	);
});

export default App;
