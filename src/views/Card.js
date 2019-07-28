import React from "react";
import "../styles/Card.scss";
import { connect } from 'react-redux';
import { Row, Col, Button } from "reactstrap";
import { changeMapCenter } from "../Redux/Actions/Map";

// TODO: Create a custom styles and className option
// TODO: Create a Desktop and Mobile version
const isInBounds = ({dispatch, refs}, {lat, lng}, scrollElem, cardRef, mapRef) => {
    const {center} = refs.map;
    const scrollPosition = scrollElem.scrollTop;

    const cardHeight = cardRef.getBoundingClientRect();
    const cardTopPosition = scrollPosition - cardHeight.top;
    const cardBottomPosition = cardTopPosition + cardHeight.height;

    if(scrollPosition >=  cardTopPosition && scrollPosition <= cardBottomPosition && center.lat !== lat) {
        mapRef.panTo({lat, lng});
        dispatch(changeMapCenter(11, lat, lng));
    }
}

class Card extends React.Component {
    render() {
        const { title, location, caption, position, mapElem, scrollElem } = this.props;
        if(mapElem && scrollElem && this.props.refs.scroll.isScrolling) {
            isInBounds(this.props, position, scrollElem, this.cardRef, mapElem);
        }
        
        return (
            <div className={`card-container col-12 ${title}`} ref={(ref) => this.cardRef = ref}>
                <Row className="card-container-row">
                    <Col className="card-image-col col-12" />
                    <Col className="card-title-col col-12">
                        <h1>
                            {title.includes("Estate") || title.includes("Ranch")
                                ? title
                                : title.concat(" Vineyard")}
                        </h1>
                    </Col>
                    <Col className="card-location-col col-12">
                        <h2>{location.toUpperCase()}</h2>
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
                        >
                            <Button color="primary">EXPLORE IN MAP</Button>
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.Map;
}

export default connect(mapStateToProps)(Card);
