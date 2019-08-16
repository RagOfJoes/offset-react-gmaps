import React from "react";
import { Row, Col } from "reactstrap";
import { toPrecise, isInBoundsVertical, isInBoundsHorizontal } from "./config";

/**
 * Card View Component
 *
 * @property {string} title The title of the card
 * @property {string} caption Caption of the card
 * @property {boolean} isMobile If Mobile view is enabled
 * @property {string} location Location of the vineyard
 * @property {object} position Position of the card's marker
 * @property {function} cardClick Action to take when card's image is clicked or when in bounds
 * @property {string} cardImage Image of the card
 * @property {object} mapCenter Map's current center, consists of Latitude and Longitude
 * @property {node} scrollElem React scroll element's ref. node
 *
 * @version 2.0.0
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
						cardClick(toPrecise(lat), toPrecise(lng));
						cardRef.current.scrollIntoView({ inline: "center", block: "center" });
					}}>
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

export default Card;
