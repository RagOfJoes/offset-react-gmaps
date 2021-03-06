import React from 'react';
import { Popup } from 'react-map-gl';
import Marker from '../../views/Marker/Marker';
import InfoWindow from '../../views/InfoWindow';
import { checkCoord } from '../config/checkCoords';
import PointMarker from '../../views/Marker/PointMarker';

const RenderMarkers = React.memo(props => {
	const { region, vineyards, coordinates, onClick, isMobile, isPopupOpen, togglePopup, viewport } = props;

	const Markers = vineyards.map(vineyard => {
		const { latitude, longitude } = viewport;
		const { lat, lng, image, location } = coordinates[vineyard];

		const cardLink = `${region.replace(/\s+/g, '-').toLowerCase()}/${vineyard.replace(/\s+/g, '-').replace("'", "").toLowerCase()}`;
		const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];

		const fill = checkCoord(latitude, longitude, lat, lng) ? '#618549' : '#A69C80';
		const shouldPopup = checkCoord(latitude, longitude, lat, lng) && isPopupOpen && !isMobile;

		return (
			<React.Fragment key={vineyard}>
				<Marker lat={lat} lng={lng} offsetTop={-40} offsetLeft={-12}>
					<PointMarker
						fill={fill}
						onClick={e => {
							e.stopPropagation();
							onClick(lat, lng, vineyardCard);
						}}
					/>
				</Marker>
				{shouldPopup ? (
					<Popup
						offsetTop={0}
						latitude={lat}
						offsetLeft={8}
						longitude={lng}
						closeOnClick={false}
						dynamicPosition={false}
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
