import React from "react";

const InfoWindow = props => {
	const { image, region, description } = props;

	// Will essentially replace all spaces with - to make URL for SEO friendly
	const regionLink = region
		.split(" ")
		.join("-")
		.toLowerCase();

	return (
		<div className="popup-container">
			<div className="popup-image">
				<img alt="Region" src={image} />
			</div>
			<div className="info-window-information">
				<p className="info-window-region">{region}</p>
				<p className="info-window-appellations">{description}</p>
				<p className="info-window-link">
					<a href={`https://staging-dawecude.kinsta.cloud/vineyards/${regionLink}`} target="_top">
						Explore Vineyard
					</a>{" "}
				</p>
			</div>
		</div>
	);
};

export default InfoWindow;
