import React from "react";

const PointMarker = props => {
	const { onClick, fill } = props;
	return (
		<svg
			width="42"
			height="51"
			fill="none"
			onClick={onClick}
			viewBox="0 0 42 51"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d)">
				<path
					d="M6.25003 17.5662V17.5656C6.25003 13.7688 7.75828 10.1276 10.443 7.44293C13.1277 4.75824 16.7689 3.25 20.5656 3.25C24.3623 3.25 28.0036 4.75824 30.6882 7.44293C33.3729 10.1276 34.8812 13.7688 34.8812 17.5656C34.8812 20.1963 33.6953 23.4902 31.2763 27.4602C28.8911 31.3748 25.3228 35.9215 20.5655 41.1015C15.801 35.9214 12.2291 31.3747 9.84399 27.4602C7.42505 23.4903 6.24293 20.1966 6.25003 17.5662Z"
					stroke="white"
					strokeWidth="0.5"
					fill={fill}
				/>
			</g>
			<path
				d="M20.5655 21.5867C23.7832 21.5867 26.3917 18.9782 26.3917 15.7605C26.3917 12.5428 23.7832 9.93427 20.5655 9.93427C17.3477 9.93427 14.7393 12.5428 14.7393 15.7605C14.7393 18.9782 17.3477 21.5867 20.5655 21.5867Z"
				fill="#FEFDF9"
			/>
			<defs>
				<filter
					id="filter0_d"
					x="0"
					y="0"
					width="41.1312"
					height="50.4706"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset dy="3" />
					<feGaussianBlur stdDeviation="3" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.231 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
				</filter>
			</defs>
		</svg>
	);
};

export default PointMarker;
