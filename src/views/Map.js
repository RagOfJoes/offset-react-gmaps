// Created By: Victor Ragojos

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignMapRef, changeMapZoom } from '../Redux/Actions/Map';
import { GoogleMap, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';

// TODO: Move API Key to an environment variable
const GoogleMaps = withScriptjs(withGoogleMap((props) => {
    const dispatch = useDispatch();

    const refs = {
        map: undefined
    };

    // Retrieve props
    const { zoom, mapOptions, defaultZoom, defaultCenter, hasKmlLayer, kmlLayerURL } = props;

    // GoogleMap Parent Component
    return (
        <GoogleMap
            zoom={zoom}
            defaultZoom={defaultZoom}
            hasKmlLayer={hasKmlLayer}
            options={{ ...mapOptions }}
            defaultCenter={defaultCenter}
            ref={(ref) => { refs.map = ref; }}
            onClick={(e) => console.log(e)}
            onIdle={() => { dispatch(changeMapZoom(13)) }}
            onTilesLoaded={() => { dispatch(assignMapRef(refs.map)); }}
        >
            {props.children}
            {
                // Check if wanted KML layer for boundaries etc.
                hasKmlLayer ?
                    <KmlLayer
                        options={
                            {
                                clickable: true,
                                preserveViewport: true,
                                suppressInfoWindows: true
                            }
                        }
                        onClick={(e) => console.log(e)}
                        url={kmlLayerURL}
                    />
                    : null
            }

        </GoogleMap>
    )
}));

const Map = (props) => {
    const { mapZoom } = useSelector((state) => state.Map);
    const { apiKey, mapOptions, defaultZoom, defaultCenter, hasKmlLayer, kmlLayerURL, mapClassName, containerClassName } = props;
    return (
        <GoogleMaps
            zoom={mapZoom}
            isMarkerShown={true}
            mapOptions={mapOptions}
            hasKmlLayer={hasKmlLayer}
            kmlLayerURL={kmlLayerURL}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            loadingElement={<div style={{ width: "100%" }} />}
            mapElement={<div className={mapClassName || "map-element"} />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
            containerElement={<div className={containerClassName || "map-element-container"} />}
        >
            {props.children}
        </GoogleMaps>
    )
}

export default Map;