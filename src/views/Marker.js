import PropTypes from "prop-types";
import React, { useState } from "react";
import { Marker, InfoWindow } from "react-google-maps";

/**
 * Marker View using react-google-maps Component by @author [Tom Chent](https://github.com/tomchentw)
 *
 * @property {float} lat for latitude
 * @property {float} lng for longtitude
 * @property {string} text Text to assign component a unique key and to connect to respective Card View component
 * @property {string} customIconImage for a custom icon image(recommend an SVG)
 * @property {node} mapRef Map View Component's React ref. node
 * @property {boolean} isClickable for determining whether marker is clickable for centering and zooming effects
 * @property {boolean} isFocused for centering and zooming effects
 * @property {boolean} hasInfoWindow for assigning Marker its own info window component
 * @property {boolean} hasScrollEffect for informing component if scroll element is present
 * @property {boolean} hasInfoWindowOpen for when another info. window is open
 * @property {function} toggleInfoWindow ensures that only one info window is open
 * @property {element} infoWindowComponent custom info window content
 *
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 * @see See [Wikipedia](https://tomchentw.github.io/react-google-maps/) for a list of different props
 */
const CustomMarker = React.memo(props => {
    // Retrieve props
    const {
        lat,
        lng,
        text,
        images,
        mapRef,
        isFocused,
        isClickable,
        hasInfoWindow,
        changeMapCenter,
        hasScrollEffect,
        hasInfoWindowOpen,
        toggleInfoWindow,
        infoWindowComponent
    } = props;

    const [infoWindow, openInfoWindow] = useState(false);

    const closeInfoWindow = () => {
        toggleInfoWindow();
        openInfoWindow(false);
    };

    // Retrieve MapRef DOM Node from Redux
    return (
        <Marker
            key={text}
            icon={{
                url: isFocused ? images.on : images.off
            }}
            clickable={isClickable}
            position={{ lat, lng }}
            zIndex={isFocused ? 2 : 1}
            // Check if clicked marker is the same as mapCenter
            opacity={
                hasInfoWindow
                    ? infoWindow
                        ? 0
                        : 1
                    : isClickable && isFocused
                    ? 1
                    : 0.6
            }
            onClick={mouseEvent => {
                // Pan to given Lat and Long coord if mapMarker is clickable
                if (isClickable) {
                    // Retrieve Lat and Long from Google Maps API event
                    const lat = mouseEvent.latLng.lat();
                    const lng = mouseEvent.latLng.lng();

                    // Toggles Info Window
                    if (hasInfoWindow && !hasInfoWindowOpen && !infoWindow) {
                        toggleInfoWindow(true);
                        openInfoWindow(true);
                    }

                    if (hasScrollEffect) {
                        mapRef.panTo({ lat, lng });

                        // Change Map Center for checking if marker isFocused
                        changeMapCenter(lat, lng);
                        document
                            .getElementsByClassName(`${text}`)[0]
                            .scrollIntoView();
                    }
                }
            }}
        >
            {hasInfoWindow && infoWindow ? (
                <InfoWindow onCloseClick={() => closeInfoWindow()}>
                    {infoWindowComponent}
                </InfoWindow>
            ) : null}
        </Marker>
    );
});

CustomMarker.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,

    text: PropTypes.string.isRequired,
    customIconImage: PropTypes.string,

    mapRef: PropTypes.node.isRequired,

    isClickable: PropTypes.bool,
    isFocused: PropTypes.bool,
    hasInfoWindow: PropTypes.bool,
    hasScrollEffect: PropTypes.bool,
    hasInfoWindowOpen: PropTypes.bool,
    toggleInfoWindow: PropTypes.bool,
    infoWindowComponent: PropTypes.element
};

export default CustomMarker;
