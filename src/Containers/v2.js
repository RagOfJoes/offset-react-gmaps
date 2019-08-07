import Map from "../views/MapV2";
import Marker from "../views/MarkerV2";
import React, { useState } from "react";
import Card from "../views/Cardv2";
import Section from "../views/Section";
import { useDispatch } from "react-redux";
import { FlyToInterpolator, TRANSITION_EVENTS } from "react-map-gl";
import { sections } from "../config/regions";
import { vineyardNames, coordinates } from "../config/coords";
import { isScrolling } from "../Redux/Actions/Map";

const V2 = () => {
    const dispatch = useDispatch();
    const [isLoaded, setMapLoaded] = useState(false);
    const [isMoving, changeMoving] = useState(false);
    const [viewport, changeViewport] = useState({
        zoom: 11,
        pitch: 200,
        bearing: 340,
        latitude: 38.4411547,
        longitude: -122.3828042,
        transitionInterruption: TRANSITION_EVENTS.UPDATE
    });
    const { latitude, longitude } = viewport;
    const scrollElem = document.getElementsByClassName("scroll-places-row")[0];
    return (
        <div className="App">
            <div
                className="scroll-places-row"
                onScroll={() => dispatch(isScrolling(true))}
            >
                {sections.map(section => {
                    const { sectionTitle, appellations } = section;
                    return (
                        <Section
                            key={sectionTitle}
                            title={sectionTitle}
                            appellations={appellations}
                        >
                            {section.vineyardNames.map(vineyard => {
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
                                        position={{ lat, lng }}
                                        mapCenter={{ latitude, longitude }}
                                        scrollElem={scrollElem}
                                        cardClick={(lat, lng) => {
                                            if (isLoaded && !isMoving) {
                                                changeViewport(prevState => ({
                                                    ...prevState,
                                                    latitude: lat,
                                                    longitude: lng,
                                                    transitionDuration: 1500,
                                                    transitionInterpolator: new FlyToInterpolator()
                                                }));
                                            }
                                        }}
                                    />
                                );
                            })}
                        </Section>
                    );
                })}
            </div>
            <div className="scroll-map-container">
                <Map
                    viewport={viewport}
                    mapLoaded={() => setMapLoaded(true)}
                    changeView={viewport =>
                        isLoaded ? changeViewport(viewport) : null
                    }
                    onTransition={trans => {
                        changeMoving(trans);
                    }}
                >
                    {vineyardNames.map(vineyard => {
                        const { lat, lng } = coordinates[vineyard];
                        const vineyardCard = document.getElementsByClassName(`${vineyard}`)[0];
                        return (
                            <Marker
                                lat={lat}
                                lng={lng}
                                key={vineyard}
                                moveToMarker={(lat, lng) => {
                                    changeViewport(prevState => ({
                                        ...prevState,
                                        latitude: lat,
                                        longitude: lng,
                                        transitionDuration: 800,
                                        transitionInterpolator: new FlyToInterpolator()
                                    }));
                                    vineyardCard.scrollIntoView();
                                }}
                            />
                        );
                    })}
                </Map>
            </div>
        </div>
    );
};

export default V2;
