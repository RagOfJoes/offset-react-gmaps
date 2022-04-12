import React from 'react';
import { Popup } from 'react-map-gl';
import Marker from '../../views/Marker/Marker';
import InfoWindow from '../../views/InfoWindow';
import { checkCoord } from '../config/checkCoords';
import PointMarker from '../../views/Marker/PointMarker';

const RenderMarkers = React.memo(props => {
	const { region, vineyards, coordinates, onClick, isPopupOpen, togglePopup, viewport } = props;

	const Markers = vineyards.map(vineyard => {
		const { latitude, longitude } = viewport;
		const { lat, lng, image, location } = coordinates[vineyard];

		const cardLink = `${region.replace(/\s+/g, '-').toLowerCase()}/${vineyard.replace(/\s+/g, '-').replace("'", "").toLowerCase()}`;

		const shouldPopup = checkCoord(latitude, longitude, lat, lng) && isPopupOpen;
		const fill = checkCoord(latitude, longitude, lat, lng) ? '#618549' : '#978A5E';
		return (
			<React.Fragment key={vineyard}>
				<Marker lat={lat} lng={lng} offsetTop={-40} offsetLeft={-12}>
					<PointMarker
						fill={fill}
						onClick={() => onClick(lat, lng)}
					/>
				</Marker>
				{shouldPopup ? (
					<Popup
						offsetTop={4}
						latitude={lat}
						offsetLeft={10}
						longitude={lng}
						closeOnClick={false}
						dynamicPosition={true}
						onClose={() => togglePopup(false)}>
						<InfoWindow image={image} region={vineyard} link={cardLink} description={location} />
					</Popup>
				) : null}
			</React.Fragment>
		);
	});

	return Markers;
});

export default RenderMarkers;
