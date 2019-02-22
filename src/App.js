// Evolutility-UI-React
// https://github.com/evoluteur/evolutility-ui-react

import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Nav from './components/shell/Nav.js';
import TopBar from './components/shell/TopBar.js';
import Footer from './components/shell/Footer.js';

import Home from './pages/Home.js';

import List from './components/views/many/List';
import Cards from './components/views/many/Cards';
import Charts from './components/views/many/Charts';
import Stats from './components/views/many/Stats';

import Browse from './components/views/one/Browse';
import Edit from './components/views/one/Edit';

import PageNotFound from './components/widgets/PageNotFound.js';
import Spinner from './components/shell/Spinner.js';
import { loadAllModels } from './models/all_models'

import 'react-toastify/dist/ReactToastify.min.css';


const AppRoutes = () => (
	<Switch>
		<Route exact path="/" component={Home} />

		<Route path="/:entity/browse/:id" component={Browse}/>
		<Route path="/:entity/browse" component={Browse}/>
		<Route path="/:entity/edit/:id" component={Edit}/>
		<Route path="/:entity/edit" component={Edit}/>

		<Route path="/:entity/cards" component={Cards}/>
		<Route path="/:entity/charts" component={Charts}/>
		<Route path="/:entity/stats" component={Stats}/>
		<Route path="/:entity/list" component={List}/>
		<Route path="/:entity" component={List}/> 

		<Route path='*' exact={true} component={PageNotFound} />
	</Switch>
);


export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { }
	}

	componentWillMount() {
		// load modeels from server
		// all AppRoutes and children access models directly so defer mounting
		loadAllModels(done => this.setState({ isDone: done }))
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<TopBar />
					<Nav />
					<div className="pageContent" role="main">
						{ this.state.isDone
							? <AppRoutes />
							: <Spinner />
						}
					</div>
					<ToastContainer autoClose={5000} />
					<Footer />
				</div>
			</BrowserRouter>
		);
	}

}
