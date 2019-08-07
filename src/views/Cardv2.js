import React from "react";
import { Col } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomMarker from "./Marker";

/**
 * Checks if Card is within the vicinity of Scoll bar, if so perform scoll animation
 *
 * @param {Ref} mapRef React Ref. node to point to the Google Maps component
 * @param {Ref} cardRef React Ref. node to point to this particular Card component
 * @param {Ref} scrollElem React Ref. node to point to the scoll element
 * @param {Object} position Destructs position to get lat and lng
 * @param {Object} props Destructs default props
 */
const isInBounds = (
    title,
    { latitude, longtitude },
    cardRef,
    scrollElem,
    { lat, lng },
    { cardClick, refs }
) => {
    const scrollPosition = scrollElem.scrollTop;

    const cardHeight = cardRef.getBoundingClientRect();
    const cardTopPosition = scrollPosition - (cardHeight.top + 50);
    const cardBottomPosition = cardTopPosition + cardHeight.height;

    if (
        scrollPosition >= cardTopPosition &&
        scrollPosition <= cardBottomPosition &&
        Number(latitude).toPrecision(10) !== lat.toPrecision(10) &&
        Number(longtitude).toPrecision(10) !== lng.toPrecision(10)
    ) {
        return cardClick(Number(lat.toPrecision(10)), Number(lng.toPrecision(10)));
    }
};

/**
 * Adds to the title when necessary
 *
 * @param {string} title Card's title prop
 */
const cardTitle = title => {
    if (title.includes("Estate") || title.includes("Ranch")) {
        return title;
    } else {
        return title.concat(" Vineyard");
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
class Card extends React.PureComponent {
    render() {
        const {
            title,
            mapCenter,
            caption,
            location,
            position,
            cardClick,
            cardImage,
            scrollElem
        } = this.props;

        // Check if cardRef and scrollElem has been assigned
        if (this.cardRef && scrollElem) {
            isInBounds(
                title,
                mapCenter,
                this.cardRef,
                scrollElem,
                position,
                this.props
            );
        }

        return (
            <div
                className={`card-container ${title}`}
                ref={ref => {
                    // Assign ref. and make sure assignment is only executed once
                    if (ref !== null && ref !== this.cardRef) {
                        this.cardRef = ref;
                    }
                }}
            >
                <div className="card-container-row justify-content-center row">
                    <Col
                        className="card-image-col"
                        onClick={() => cardClick(position.lat, position.lng)}
                    >
                        <img src={cardImage} alt={`${title}`} />
                    </Col>
                    <Col className="card-title-col col-12">
                        <h2 className="club-name">{cardTitle(title)}</h2>
                    </Col>
                    <Col className="card-location-col col-12">
                        <h3>{location.toUpperCase()}</h3>
                    </Col>
                    <Col className="card-caption-col col-12">
                        <p>{caption}</p>
                    </Col>
                    <Col className="card-button-col col-12">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${
                                position.lat
                            },${position.lng}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="btn btn-primary"
                        >
                            Explore Vineyard
                        </a>
                    </Col>
                </div>
            </div>
        );
    }
}

// Retrieve Redux state and assign to props
const mapStateToProps = state => {
    return state.Map;
};

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

export default connect(mapStateToProps)(Card);
