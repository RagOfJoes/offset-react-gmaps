import "./App.scss";
import React from "react";
import MapV2 from "./Containers/v2";
import main from "./Containers/main";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={main} />
					<Route path="/maps" component={MapV2} />
				</Switch>
			</div>
		);
	}
}

export default App;
