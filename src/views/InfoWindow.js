import React from "react";

/**
 * InfoWindow Component
 * 
 * @param {object} props Required Props for View Component 
 * 
 * @version 2.0.0
 * @author [Victor Ragojos](https://github.com/RagOfJoes)
 */
const InfoWindow = props => {
	const { image, region, description, link } = props;

	return (
		<div className="popup-container">
			<div className="popup-image">
				<img alt="Region" src={image} />
			</div>
			<div className="info-window-information">
				<p className="info-window-region">{region}</p>
				<p className="info-window-appellations">{description}</p>
				<p className="info-window-link">
					<a href={`https://twomey.com/${link}`} target="_top">
						Explore Vineyard
					</a>{" "}
				</p>
			</div>
		</div>
	);
};

export default InfoWindow;
