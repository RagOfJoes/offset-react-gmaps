import React from "react";

const LabelMarker = props => {
	const { title } = props;
	return (
		<div className="labelMarkerContainer">
			<p>{title}</p>
		</div>
	);
};

export default LabelMarker;
