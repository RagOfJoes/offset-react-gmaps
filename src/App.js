import './App.scss';
import React from 'react';
import Maps from './Containers/maps';
import OverviewMap from './Containers/main';
import { sections } from './config/regions';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={OverviewMap} />
					<Route
						exact
						path="/:region"
						render={props => {
							return <Maps region={sections[props.match.params.region]} />;
						}}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
