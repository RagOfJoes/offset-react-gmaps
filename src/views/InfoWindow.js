import React from "react";

const InfoWindow = React.memo(props => {
    const { region, appellations } = props;

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
