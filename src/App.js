import React from 'react';
import GlobalStyle from './globalStyles';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Switch>
				<Route path="/" exact component={HomePage} />
			</Switch>
		</Router>
	);
}

export default App;
