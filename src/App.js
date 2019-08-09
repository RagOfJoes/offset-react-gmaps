import "./App.scss";
import React from "react";
import MapV2 from "./Containers/v2";
import main from "./Containers/main";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CentralCoast from "./Containers/central-coast";
import WillametteValley from "./Containers/willamette-valley";
import NorthernCalifornia from "./Containers/northern-california";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={main} />
					<Route path="/willamette-valley" component={WillametteValley} />
					<Route path="/northern-california" component={NorthernCalifornia} />
					<Route path="/central-coast" component={CentralCoast} />
					<Route path="/v2" component={MapV2} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state.Map;
};

export default connect(mapStateToProps)(App);
