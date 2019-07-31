import "./App.scss";
import React from "react";
import Map from "./views/Map";
import Card from "./views/Card";
import Marker from "./views/Marker";
import Section from "./views/Section";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { mapStyle } from "./config/mapStyle";
import { sections } from "./config/regions";
import { coordinates, vineyardNames } from "./config/coords";
import { assignScrollRef, isScrolling } from "./Redux/Actions/Map";
import { InfoWindow } from "react-google-maps";

class App extends React.Component {
    render() {
        const { refs } = this.props;
        const { center } = refs.map;

        const assignScroll = ref => {
            // Prevents from executing assignRef multiple times
            if (!this.scrollRef) {
                this.scrollRef = ref;
                this.props.dispatch(assignScrollRef(ref));
            }
        };

        return (
            <Container fluid className="App">
                <div
                    className="scroll-places-row"
                    ref={ref => assignScroll(ref)}
                    onScroll={() => this.props.dispatch(isScrolling(true))}
                >
                    {sections.map(section => {
                        const {
                            sectionTitle,
                            appellations,
                            vineyardNames
                        } = section;

                        return (
                            <Section
                                key={sectionTitle}
                                title={sectionTitle}
                                appellations={appellations}
                            >
                                {vineyardNames.map(vineyard => {
                                    const {
                                        lat,
                                        lng,
                                        caption,
                                        location
                                    } = coordinates[vineyard];
                                    return (
                                        <Card
                                            key={vineyard}
                                            title={vineyard}
                                            caption={caption}
                                            location={location}
                                            position={{ lat, lng }}
                                            mapElem={refs.map.ref}
                                            scrollElem={this.scrollRef}
                                        />
                                    );
                                })}
                            </Section>
                        );
                    })}
                </div>
                <Map
                    // Map style props
                    defaultZoom={10}
                    mapClassName="scroll-map-row"
                    containerClassName="scroll-map-container"
                    // Required props
                    apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                    defaultCenter={{ lat: 45.2825284, lng: -123.0408265 }}
                    // KML Layer Props, This is for the geofencing of Vineyards etc.
                    hasKmlLayer
                    kmlLayerURL="http://www.google.com/maps/d/kml?forcekml=1&mid=1GzhhLKvqqJfFwnxdnkwW5q8qVaWZpzPI"
                    // Map Options Props
                    mapOptions={{
                        // minZoom: 10,
                        // maxZoom: 11,
                        zoomControl: true,
                        disableDefaultUI: true,

                        // Custom Map Style
                        styles: mapStyle
                    }}
                >
                    {// Map entire coordinates array for Markers and Vineyard names
                    vineyardNames.map(vineyard => {
                        const { lat, lng } = coordinates[vineyard];
                        return (
                            <Marker
                                // Position props
                                lat={lat}
                                lng={lng}
                                // Key/Ref props
                                key={vineyard}
                                text={vineyard}
                                // customIcon prop
                                images={{
                                    on: require("./assets/markeron.svg"),
                                    off: require("./assets/markeroff.svg")
                                }}
                                // isFocused props
                                isClickable
                                /**
                                 * toPrecision method is for ensuring that lang & lng returned by onClick event, @see See [src/views](Marker), are the same as,
                                 * @see See [src/config](coords), lat & lng
                                 */
                                isFocused={
                                    lat.toPrecision(10) ===
                                        center.lat.toPrecision(10) &&
                                    lng.toPrecision(10) ===
                                        center.lng.toPrecision(10)
                                }
                            />
                        );
                    })}
                </Map>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return state.Map;
};

export default connect(mapStateToProps)(App);
