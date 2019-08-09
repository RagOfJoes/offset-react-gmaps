import React from "react";

const InfoWindow = props => {
	const { region, description } = props;

	// Will essentially replace all spaces with - to make URL for SEO friendly
	const regionLink = region
		.split(" ")
		.join("-")
		.toLowerCase();

	return (
		<div className="popup-container">
			<div className="popup-image">
				<img alt="Region" src={require("../assets/temp-vineyard-img.png")} />
			</div>
			<div className="info-window-information">
				<h2 className="info-window-region">{region}:</h2>
				<p className="info-window-appellations">{description}</p>
				<p className="info-window-link">
					<a href={`https://staging-dawecude.kinsta.cloud/vineyards/${regionLink}`} target="_top">
						Explore Map
					</a>{" "}
				</p>
			</div>
		</div>
	);
};

export default InfoWindow;
