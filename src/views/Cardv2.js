import React from "react";
import PropTypes from "prop-types";
import CustomMarker from "./Marker";
import { Row, Col } from "reactstrap";

const toPrecise = num => {
	return Number(num).toPrecision(5);
};

/**
 * Checks if Card is within the vicinity of Scoll bar, if so perform scoll animation
 *
 * @param {Ref} mapRef React Ref. node to point to the Google Maps component
 * @param {Ref} cardRef React Ref. node to point to this particular Card component
 * @param {Ref} scrollElem React Ref. node to point to the scoll element
 * @param {Object} position Destructs position to get lat and lng
 * @param {Object} props Destructs default props
 */
const isInBoundsHorizontal = ({ latitude, longtitude }, cardRef, scrollElem, { lat, lng }, { cardClick }) => {
	const scrollPosition = scrollElem.scrollLeft + 10;

	const cardWidth = cardRef.getBoundingClientRect();
	const cardLeftPosition = scrollPosition - cardWidth.left;
	const cardRightPosition = cardLeftPosition + cardWidth.width;

	if (scrollPosition >= cardLeftPosition && scrollPosition <= cardRightPosition) {
		if (toPrecise(latitude) !== toPrecise(lat) && toPrecise(longtitude) !== toPrecise(lng)) {
			cardClick(Number(lat.toPrecision(5)), Number(lng.toPrecision(5)));
		}
		return cardRef.scrollIntoView({ inline: "center" });
	}
};

const isInBoundsVertical = (
	{ latitude, longtitude },
	cardRef,
	scrollElem,
	{ lat, lng },
	{ cardClick, isMapMoving }
) => {
	const scrollPosition = scrollElem.scrollTop;

	const cardHeight = cardRef.getBoundingClientRect();
	const cardTopPosition = scrollPosition - cardHeight.top;
	const cardBottomPosition = cardTopPosition + cardHeight.height;

	if (scrollPosition >= cardTopPosition && scrollPosition <= cardBottomPosition) {
		if (toPrecise(latitude) !== toPrecise(lat) && toPrecise(longtitude) !== toPrecise(lng)) {
			return cardClick(Number(lat.toPrecision(5)), Number(lng.toPrecision(5)));
		}

		if (!isMapMoving) {
			return cardRef.scrollIntoView({ block: "center" });
		}
	}
};

/**
 * Card View Component
 *
 * @property {string} title The title of the card
 * @property {string} caption Caption of the card
 * @property {string} cardImage Image of the card
 * @property {string} location Location of the vineyard
 * @property {node} mapRef React map ref. node
 * @property {node} scrollElem React scroll element's ref. node
 * @property {object} position Position of the card's marker
 * @property {function} cardClick Action to take when card's image is clicked or when in bounds
 *
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 */
const Card = React.memo(props => {
	const { title, caption, isMobile, location, position, cardClick, cardImage, mapCenter, scrollElem } = props;

	const cardRef = React.useRef(null);

	// Check if cardRef and scrollElem has been assigned
	if (!isMobile && cardRef !== null && scrollElem !== null) {
		isInBoundsVertical(mapCenter, cardRef.current, scrollElem, position, props);
	} else if (isMobile && cardRef !== null && scrollElem !== null) {
		isInBoundsHorizontal(mapCenter, cardRef.current, scrollElem, position, props);
	}

	return (
		<div className={`card-container ${title}`} ref={cardRef}>
			<div className="card-container-row justify-content-center row">
				<Col
					className="card-image-col"
					onClick={() => {
						// Image click | Recenters map and scrolls to Card
						const { lat, lng } = position;
						cardClick(Number(lat.toPrecision(5)), Number(lng.toPrecision(5)));
						cardRef.current.scrollIntoView({ inline: "center", block: "center" });
					}}
                    // on
                    >
					<img src={cardImage} alt={`${title}`} />
				</Col>
				<Col>
					<Row>
						<Col className="card-title-col col-12">
							<h2 className="club-name">{title}</h2>
						</Col>
						<Col className="card-location-col col-12">
							<h3>{location.toUpperCase()}</h3>
						</Col>
						<Col className="card-caption-col col-12">
							<p>{caption}</p>
						</Col>
						<Col className="card-button-col col-12">
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
								rel="noopener noreferrer"
								target="_blank"
								className="btn btn-primary">
								Explore Vineyard
							</a>
						</Col>
					</Row>
				</Col>
			</div>
		</div>
	);
});

CustomMarker.propTypes = {
	title: PropTypes.string,
	caption: PropTypes.string,
	location: PropTypes.string,
	cardImage: PropTypes.string,

	mapRef: PropTypes.node,
	scrollElem: PropTypes.node,

	position: PropTypes.objectOf({
		lat: PropTypes.number,
		lng: PropTypes.number
	}),
	cardClick: PropTypes.func
};

export default Card;
