import React from "react";
import Map from "../views/Map";
import Card from "../views/Card";
import Marker from "../views/Marker";
import Section from "../views/Section";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { mapStyle } from "../config/mapStyle";
import { sections } from "../config/regions";
import { coordinates } from "../config/coords";
import {
    assignScrollRef,
    isScrolling,
    assignMapRef,
    changeMapCenter
} from "../Redux/Actions/Map";

class Region extends React.PureComponent {
    componentDidMount() {
        const { vineyardNames } = sections[2];
        this.props.dispatch(
            changeMapCenter(
                coordinates[vineyardNames[0]].lat,
                coordinates[vineyardNames[0]].lng
            )
        );
    }

    render() {
        const { refs } = this.props;
        const { center } = refs.map;

        const { sectionTitle, appellations, vineyardNames } = sections[2];

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
                    {
                        <Section
                            key={sectionTitle}
                            title={sectionTitle}
                            appellations={appellations}
                        >
                            {vineyardNames.map(vineyard => {
                                const {
                                    lat,
                                    lng,
                                    image,
                                    caption,
                                    location
                                } = coordinates[vineyard]; // Get vineyard's info
                                return (
                                    <Card
                                        key={vineyard}
                                        title={vineyard}
                                        caption={caption}
                                        cardImage={image}
                                        location={location}
                                        mapRef={refs.map.ref}
                                        position={{ lat, lng }}
                                        scrollElem={this.scrollRef}
                                        cardClick={() => {
                                            refs.map.ref.panTo({
                                                lat,
                                                lng
                                            });
                                            this.props.dispatch(
                                                changeMapCenter(lat, lng)
                                            );
                                        }}
                                    />
                                );
                            })}
                        </Section>
                    }
                </div>
                <Map
                    // Map style props
                    defaultZoom={10}
                    mapClassName="scroll-map-row"
                    containerClassName="scroll-map-container"
                    // Required props
                    mapRef={refs.map.ref}
                    apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                    defaultCenter={{
                        lat: coordinates[vineyardNames[0]].lat,
                        lng: coordinates[vineyardNames[0]].lng
                    }}
                    dispatchMapRef={ref =>
                        this.props.dispatch(assignMapRef(ref))
                    }
                    // KML Layer Props, This is for the geofencing of Vineyards etc.
                    hasKmlLayer
                    kmlLayerURL="http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1Dgj_2rrvHqho_-dt2h8v-YnZ9P4g62hu&lid=HHl7j0Xt_bI"
                    // Map Options Props
                    mapOptions={{
                        // Zoom control options
                        // minZoom: 10,
                        // maxZoom: 11,
                        zoomControl: true, // shows Zoom buttons in Google Maps

                        // UI Control
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
                                mapRef={refs.map.ref}
                                // Actions dispatches
                                changeMapCenter={(lat, lng) =>
                                    this.props.dispatch(
                                        changeMapCenter(lat, lng)
                                    )
                                }
                                // ScrollEffect
                                hasScrollEffect
                                // customIcon prop
                                images={{
                                    on: require("../assets/markeron.svg"),
                                    off: require("../assets/markeroff.svg")
                                }}
                                // InfoWindow props
                                hasInfoWindow={false}
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

export default connect(mapStateToProps)(Region);
