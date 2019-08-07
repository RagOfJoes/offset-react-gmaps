import React from "react";
import { Marker } from "react-map-gl";

const MarkerV2 = React.memo(props => {
    const { lat, lng, moveToMarker } = props;
    return (
        <Marker anchor="bottom" latitude={lat} longitude={lng} offsetTop={-30} offsetLeft={-10}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="44.471"
                viewBox="0 0 38 44.471"
                onClick={() => moveToMarker(lat, lng)}
            >
                <defs>
                    <filter
                        id="Path_2"
                        x="0"
                        y="0"
                        width="38"
                        height="44.471"
                        filterUnits="userSpaceOnUse"
                    >
                        <feOffset dy="3" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodOpacity="0.231" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                    <filter
                        id="Ellipse_3"
                        x="12"
                        y="7.817"
                        width="14"
                        height="14"
                        filterUnits="userSpaceOnUse"
                    >
                        <feOffset input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1" result="blur-2" />
                        <feFlood floodColor="#1e1e1e" floodOpacity="0.431" />
                        <feComposite operator="in" in2="blur-2" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g id="markerv2" transform="translate(5 6)">
                    <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(4)"
                    >
                        <g
                            transform="matrix(1, 0, 0, 1, -9, -6)"
                            filter="url(#Path_2)"
                        >
                            <path
                                id="Path_2-2"
                                data-name="Path 2"
                                d="M14,26.471Q3.985,15.618,4,10.059a10,10,0,1,1,20,0Q24,15.618,14,26.471Z"
                                transform="translate(5 6)"
                                fill="#a69c80"
                            />
                        </g>
                    </g>
                    <g
                        transform="matrix(1, 0, 0, 1, -5, -6)"
                        filter="url(#Ellipse_3)"
                    >
                        <circle
                            id="Ellipse_3-2"
                            data-name="Ellipse 3"
                            cx="4"
                            cy="4"
                            r="4"
                            transform="translate(15 10.82)"
                            fill="#fefdf9"
                        />
                    </g>
                </g>
            </svg>
        </Marker>
    );
});

export default MarkerV2;
