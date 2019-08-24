import React from 'react';

const Tabs = props => {
	const { tab, toggleTab, region } = props;
	return (
		<div className="scroll-tabs">
			<div className="tabTitle" >
				<h1 style={tab === 1 ? null : { width: 0}}>{region}</h1>
			</div>
			<div className="tabsContainer">
				<div
					className="mapTabContainer"
					onClick={() => (tab !== 1 ? toggleTab(1) : null)}
					style={tab === 1 ? { borderBottom: '2px solid #A69C80' } : null}>
					<h3 className="mapTab">View As Map</h3>
				</div>
				<div
					className="listTabContainer"
					onClick={() => (tab !== 2 ? toggleTab(2) : null)}
					style={tab === 2 ? { borderBottom: '2px solid #A69C80' } : null}>
					<h3 className="listTab">View As List</h3>
				</div>
			</div>
		</div>
	);
};

export default Tabs;
