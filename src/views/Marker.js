import React from 'react';
import { } from 'reactstrap';
import { Marker } from 'react-google-maps';
import { changeMapCenter } from '../Redux/Actions/Map';
import { useDispatch, useSelector } from 'react-redux';

const CustomMarker = (props) => {
    const dispatch = useDispatch();
    const { mapRef } = useSelector(state => state.Map)
    const { lat, lng, text, isFocused } = props;
    return (
        <Marker
            clickable
            key={text}
            position={{ lat, lng }}
            opacity={isFocused ? 1 : .7}
            onClick={(e) => {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                dispatch(changeMapCenter(lat, lng));
                mapRef.panTo({ lat, lng });
            }}
        />
    )
}

export default CustomMarker;