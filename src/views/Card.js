import React from "react";
import { Col } from "reactstrap";
import { connect } from "react-redux";
import { changeMapCenter } from "../Redux/Actions/Map";

// TODO: Create a custom styles and className option
// TODO: Create a Desktop and Mobile version
const isInBounds = (
    { dispatch, refs },
    { lat, lng },
    scrollElem,
    cardRef,
    mapRef
) => {
    const { center } = refs.map;
    const scrollPosition = scrollElem.scrollTop;

    const cardHeight = cardRef.getBoundingClientRect();
    const cardTopPosition = scrollPosition - (cardHeight.top + 50);
    const cardBottomPosition = cardTopPosition + cardHeight.height;

    if (
        scrollPosition >= cardTopPosition &&
        scrollPosition <= cardBottomPosition &&
        center.lat !== lat
    ) {
        mapRef.panTo({ lat, lng });
        dispatch(changeMapCenter(11, lat, lng));
    }
};

class Card extends React.Component {
    render() {
        const {
            title,
            location,
            caption,
            position,
            mapElem,
            scrollElem
        } = this.props;
        if (mapElem && scrollElem && this.props.refs.scroll.isScrolling) {
            isInBounds(this.props, position, scrollElem, this.cardRef, mapElem);
        }

        return (
            <div
                className={`card-container ${title}`}
                ref={ref => (this.cardRef = ref)}
            >
                <div className="card-container-row justify-content-center row">
                    <Col className="card-image-col">
                        <img
                            src={require("../assets/temp-vineyard-img.png")}
                            alt={`${title}`}
                        />
                    </Col>
                    <Col className="card-title-col col-12">
                        <h2 className="club-name">
                            {title.includes("Estate") || title.includes("Ranch")
                                ? title
                                : title.concat(" Vineyard")}
                        </h2>
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

const mapStateToProps = state => {
    return state.Map;
};

export default connect(mapStateToProps)(Card);
