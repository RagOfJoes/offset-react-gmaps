import React from 'react';
import Card from '../../views/Card/Card';
import { coordinates } from '../../config/coords';

const RenderCards = React.memo(props => {
	const { section, scrollElem, isMobile, isMoving, isList, onClick, viewport } = props;

	const { latitude, longitude } = viewport;

	const cards = section.vineyards.map(vineyard => {
		const { lat, lng, image, caption, location } = coordinates[vineyard]; // Get vineyard's info

		// Creates Card Link
		const cardLink = `${section.sectionTitle.replace(/\s+/g, '-').toLowerCase()}/${vineyard.replace(/\s+/g, '-').toLowerCase()}`;
		return (
			<Card
				key={vineyard}
				isList={isList}
				title={vineyard}
				caption={caption}
				cardImage={image}
				location={location}
				isMobile={isMobile}
				cardLink={cardLink}
				isMapMoving={isMoving}
				position={{ lat, lng }}
				scrollElem={scrollElem}
				mapCenter={{ latitude, longitude }}
				cardClick={(lat, lng) => onClick(lat, lng)}
			/>
		);
	});

	return cards;
});

export default RenderCards;
