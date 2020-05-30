import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Info from './components/Info';
import Home from './components/Home';

const Main = () => {
	return (
		<Switch>
			{/* {' '} */}
			{/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path="/" component={Home}></Route>
			<Route exact path="/info/:location" component={Info}></Route>
			<Route component={Home}></Route>
		</Switch>
	);
};

export default Main;
