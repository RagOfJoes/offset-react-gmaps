import React from "react";

/**
 * Custom Info Window content for Google Maps
 * 
 * @property {string} region
 * @property {string} appellations
 * 
 * @version 1.0.0
 * @author [Victor Ragojos](https://github.com/ragofjoes)
 */
const InfoWindow = React.memo(props => {
    const { region, appellations } = props;

    // Will essentially replace all spaces with - to make URL for SEO friendly
    const regionLink = region.split(' ').join('-').toLowerCase();

    return (
        <div className="info-window-container">
            <div className="info-window-image">
                <img
                    src={require("../assets/temp-vineyard-img.png")}
                    alt="Region"
                />
            </div>
            <div className="info-window-information">
                <h2 className="info-window-region">{region}</h2>
                <p className="info-window-appellations">
                    <strong>APPELLATIONS: </strong>
                    {appellations}
                </p>
                <p className="info-window-link">
                <a href={`https://staging-dawecude.kinsta.cloud/vineyards/${regionLink}`} target="_top">Explore Map</a>                </p>
            </div>
        </div>
    );
});

export default InfoWindow;
