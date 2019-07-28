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
import { assignScrollRef, isScrolling, } from "./Redux/Actions/Map";

// TODO: Get API key
// TODO: Import google maps API
class App extends React.Component {
    componentWillUnmount() {
        this.scrollRef.removeListener("scroll");
    }

    render() {
        const { refs } = this.props;
        const { center } = refs.map;

        const assignScroll = (ref) => {
            // Prevents from executing assignRef multiple times
            if(!this.scrollRef) {
                this.scrollRef = ref;
                this.props.dispatch(assignScrollRef(ref));
                this.scrollRef.addEventListener("scroll", () => this.props.dispatch(isScrolling(true)));
            }
        }

        return (
            <Container fluid className="App">
                <div className="scroll-places-row" ref={(ref) => assignScroll(ref) }>
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
                    defaultZoom={11}
                    mapClassName="scroll-map-row"
                    containerClassName="scroll-map-container"
                    // Required props
                    apiKey="AIzaSyAfLyiMPaR2VvvyGTqY7S6kX-SYcjUJyYE"
                    defaultCenter={{ lat: 38.5781274, lng: -122.8758549 }}
                    // KML Layer Props
                    hasKmlLayer
                    kmlLayerURL="http://www.google.com/maps/d/kml?forcekml=1&mid=1GzhhLKvqqJfFwnxdnkwW5q8qVaWZpzPI"
                    // Map Options Props
                    mapOptions={{
                        minZoom: 11,
                        maxZoom: 11,
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
                                customIconImage={require("./assets/CustomMarker.svg")}
                                // isFocused props
                                isClickable
                                /**
                                 * toPrecision method is for ensuring that lang & lng returned by onClick event, @see See [src/views](Marker), are the same as,
                                 * @see See [src/config](coords), lat & lng
                                 *
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
