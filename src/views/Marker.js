/**
 * Marker View using react-google-maps Component by @author [Tom Chent](https://github.com/tomchentw)
 *
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/RagofJoes)
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Marker, InfoWindow } from "react-google-maps";
import { changeMapCenter } from "../Redux/Actions/Map";
import { useDispatch, useSelector } from "react-redux";

/**
 *   Figure Custom Marker View Component
 *
 *   @see See [Wikipedia](https://tomchentw.github.io/react-google-maps/) for a list of different props
 */
const CustomMarker = React.memo(props => {
    const dispatch = useDispatch();
    const [isInfoWindowOpen, toggleInfoWindow] = useState(false);

    // Retrieve props
    const { lat, lng, text, images, isClickable, isFocused } = props;

    // Retrieve MapRef DOM Node from Redux
    const { ref, zoom } = useSelector(state => state.Map.refs.map);
    return (
        <div>
            <Marker
                key={text}
                icon={{
                    url: isFocused ? images.on : images.off
                }}
                animation={2}
                // label={{
                //     color: 'black',
                //     fontSize: '30px',
                //     fontWeight: "bold",
                //     text: text.toUpperCase(),
                //     fontFamily: 'Open+Sans+Condensed',
                // }}
                clickable={isClickable}
                position={{ lat, lng }}
                zIndex={isFocused ? 2 : 1}
                // Check if clicked marker is the same as mapCenter
                opacity={isClickable && isFocused ? 1 : 0.7}
                onClick={mouseEvent => {
                    // Pan to given Lat and Long coord if mapMarker is clickable
                    if (isClickable) {
                        // Retrieve Lat and Long from Google Maps API event
                        const lat = mouseEvent.latLng.lat();
                        const lng = mouseEvent.latLng.lng();
                        ref.panTo({ lat, lng });

                        // Change Map Center for checking if marker isFocused
                        dispatch(
                            changeMapCenter(zoom === 11 ? 13 : 11, lat, lng)
                        );

                        // Scrolls to respective Card Component
                        toggleInfoWindow(true);
                        document
                            .getElementsByClassName(`${text}`)[0]
                            .scrollIntoView();
                    }
                }}
            >
                {isInfoWindowOpen ? (
                    <InfoWindow
                        onCloseClick={() => toggleInfoWindow(false)}
                    >
                        <div>HELLO</div>
                    </InfoWindow>
                ) : null}
            </Marker>
        </div>
    );
});

CustomMarker.propTypes = {
    /**
     * @param {float} lat for latitude
     * @param {flaot} lng for longtitude
     */
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,

    /**
     * @param {string} customIconImage for a custom icon image(recommend an SVG)
     */
    customIconImage: PropTypes.string,

    /**
     * @param {boolean} isClickable for determining whether marker is clickable for centering and zooming effects
     * @param {boolean} isFocused for centering and zooming effects
     */
    isClickable: PropTypes.bool,
    isFocused: PropTypes.bool
};

export default CustomMarker;
