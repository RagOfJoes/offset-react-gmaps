/**
 * Converts number to a value that can be compared precisely
 *
 * @param {Number} num
 */
export const toPrecise = num => {
	return Number(Number(num).toPrecision(5));
};

/**
 * Checks if Card is within the vicinity of Horizontal Scoll bar, if so perform scoll animation
 *
 * @param {Object} mapCenter Destructs mapCenter to retrieve lattitude and longitude
 * @param {Ref} cardRef React Ref. node to point to this particular Card component
 * @param {Ref} scrollElem React Ref. node to point to the scoll element
 * @param {Object} position Destructs position to get lat and lng
 * @param {Object} props Destructs default props for App state
 */
export const isInBoundsHorizontal = ({ latitude, longtitude }, cardRef, scrollElem, { lat, lng }, { cardClick, isMapMoving }) => {
	const scrollPosition = scrollElem.scrollLeft;

	const cardWidth = cardRef.getBoundingClientRect();
	const cardLeftPosition = scrollPosition - cardWidth.left;
	const cardRightPosition = cardLeftPosition + cardWidth.width;

	if (scrollPosition >= cardLeftPosition && scrollPosition <= cardRightPosition) {
		if (toPrecise(latitude) !== toPrecise(lat) && toPrecise(longtitude) !== toPrecise(lng)) {
			return cardClick(lat, lng);
		}

		if (!isMapMoving) {
			return cardRef.scrollIntoView({ inline: 'center' });
		}
	}
};

/**
 * Checks if Card is within the vicinity of Vertical Scoll bar, if so perform scoll animation
 *
 * @param {Object} mapCenter Destructs mapCenter to retrieve lattitude and longitude
 * @param {Ref} cardRef React Ref. node to point to this particular Card component
 * @param {Ref} scrollElem React Ref. node to point to the scoll element
 * @param {Object} position Destructs position to get lat and lng
 * @param {Object} props Destructs default props for App state
 */
export const isInBoundsVertical = ({ latitude, longtitude }, cardRef, scrollElem, { lat, lng }, { cardClick, isMapMoving }) => {
	const scrollPosition = scrollElem.scrollTop;

	const cardHeight = cardRef.getBoundingClientRect();
	const cardTopPosition = scrollPosition - cardHeight.top;
	const cardBottomPosition = cardTopPosition + cardHeight.height;

	if (scrollPosition >= cardTopPosition && scrollPosition <= cardBottomPosition) {
		if (toPrecise(latitude) !== toPrecise(lat) && toPrecise(longtitude) !== toPrecise(lng)) {
			return cardClick(lat, lng);
		}

		if (!isMapMoving) {
			return cardRef.scrollIntoView({ block: 'center' });
		}
	}
};
