import "./App.scss";
import React from "react";
import maps from "./Containers/maps";
import main from "./Containers/main";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={main} />
					<Route exact path="/maps" component={maps} />
				</Switch>
			</div>
		);
	}
}

export default App;
