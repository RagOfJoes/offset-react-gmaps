import React from "react";
import { Marker } from "react-map-gl";

const MarkerV2 = React.memo(props => {
	const { lat, lng, moveToMarker } = props;
	return (
		<Marker anchor="bottom" latitude={lat} longitude={lng} offsetTop={-30} offsetLeft={-12}>
			<svg
				width="42"
				height="51"
				viewBox="0 0 42 51"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => moveToMarker(lat, lng)}>
				<g filter="url(#filter0_d)">
					<path
						d="M20.9992 41.4706C11.2743 30.9319 6.41906 22.9636 6.43363 17.5656C6.43363 13.7025 7.96821 9.99773 10.6998 7.26616C13.4314 4.53458 17.1362 3 20.9992 3C24.8622 3 28.567 4.53458 31.2986 7.26616C34.0302 9.99773 35.5648 13.7025 35.5648 17.5656C35.5648 22.9636 30.7096 30.9319 20.9992 41.4706Z"
						fill="#A69C80"
					/>
				</g>
				<path
					d="M21.0001 21.587C24.2178 21.587 26.8263 18.9785 26.8263 15.7608C26.8263 12.5431 24.2178 9.93457 21.0001 9.93457C17.7823 9.93457 15.1738 12.5431 15.1738 15.7608C15.1738 18.9785 17.7823 21.587 21.0001 21.587Z"
					fill="#FEFDF9"
				/>
				<defs>
					<filter
						id="filter0_d"
						x="0.433594"
						y="0"
						width="41.1312"
						height="50.4706"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						/>
						<feOffset dy="3" />
						<feGaussianBlur stdDeviation="3" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.231 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
					</filter>
				</defs>
			</svg>
		</Marker>
	);
});

export default MarkerV2;
