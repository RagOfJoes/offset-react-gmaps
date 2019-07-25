import React from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';
import { assignMapRef } from '../Redux/Actions/Map';

// TODO: Move API Key to an environment variable
const GMap = withScriptjs(withGoogleMap((props) => {
    const dispatch = useDispatch();
    const refs = { map: undefined };
    const { defaultCenter } = props;
    return (
        <GoogleMap
            defaultZoom={11}
            onTilesLoaded={() => dispatch(assignMapRef(refs.map))}
            ref={(ref) => { refs.map = ref; }}
            options={
                {
                    disableDefaultUI: true
                }
            }
            defaultCenter={defaultCenter}
        >
            {props.children}
            <KmlLayer
                options={
                    {
                        preserveViewport: true,
                        suppressInfoWindows: true
                    }
                }
                url={"http://www.google.com/maps/d/kml?forcekml=1&mid=1GzhhLKvqqJfFwnxdnkwW5q8qVaWZpzPI"}
            />
        </GoogleMap>
    )
}))

const Map = (props) => {
    const { defaultCenter } = props;
    const { mapZoom } = useSelector((state) => state.Map);
    return (
        <GMap
            zoom={mapZoom}
            isMarkerShown={true}
            defaultCenter={defaultCenter}
            mapElement={<div className="scroll-map-row" />}
            loadingElement={<div style={{ width: "100%" }} />}
            containerElement={<Container className="scroll-map-container" />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfLyiMPaR2VvvyGTqY7S6kX-SYcjUJyYE"
        >
            {props.children}
        </GMap>
    )
}

export default Map;