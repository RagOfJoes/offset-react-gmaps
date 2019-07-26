// Created By: Victor Ragojos

import React from 'react';
import { Marker } from 'react-google-maps';
import { changeMapCenter } from '../Redux/Actions/Map';
import { useDispatch, useSelector } from 'react-redux';

const CustomMarker = (props) => {
    const dispatch = useDispatch();
    const refs = {
        marker: undefined
    }

    // Retrieve props
    const { lat, lng, text, customIconImage, isClickable, isFocused } = props;

    // Retrieve MapRef DOM Node from Redux
    const { mapRef, mapZoom } = useSelector(state => state.Map)
    return (
        <Marker
            key={text}
            icon={
                {
                    // Retrieve from local files image
                    url: customIconImage ? customIconImage : null
                }
            }
            clickable={isClickable}
            position={{ lat, lng }}
            ref={ref => refs.marker = ref}
            // Check if clicked marker is the same as mapCenter
            opacity={isClickable && isFocused ? 1 : .7}
            onClick={(mouseEvent) => {
                // Retrieve Lat and Long from Google Maps API event
                const lat = mouseEvent.latLng.lat();
                const lng = mouseEvent.latLng.lng();

                // Pan to given Lat and Long coord if mapMarker is clickable
                if (isClickable) {
                    mapRef.panTo({ lat, lng })

                    // Change Map Center for checking if marker isFocused
                    dispatch(changeMapCenter(mapZoom === 10 ? 13 : 10, lat, lng));
                }
            }}
        />
    )
}

export default CustomMarker;