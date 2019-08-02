import React from "react";

/**
 * Section View Component
 * 
 * @property {string} title
 * @property {string} appellations
 * @property {string} description
 * 
 * @version 1.0.0
 * @author [VictorRagojos](https://github.com/ragofjoes)
 */
const Section = props => {
    const { title, appellations } = props;
    return (
        <div className="section-container">
            <div className="section-row">
                <h1 className="region-name">{title}</h1>

                <p className="appellations">
                    <strong>APELLATIONS:</strong> {appellations}
                </p>

                <p className="appellation-description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sapiente modi quis porro recusandae ab ea omnis quisquam
                    nemo in quidem. Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit.
                </p>
            </div>
            <div className="section-card-row row">{props.children}</div>
        </div>
    );
};

export default Section;
