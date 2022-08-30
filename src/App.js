import React from 'react';
import Navbar from './layouts/Navbar';
import Content from './layouts/Content';
import API from './assets/json/api-quiz.json';

import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const axios = require('axios').default;

axios.interceptors.request.use(function (config) {
		config.baseURL = API.baseURL;
		config.headers = {'X-Api-Key': API.token};
		return config;
	}, function (error) {
		console.log('error', error);
		return Promise.reject(error);
	});

const App = () => {
	return (
		<div className="wrapper">
			<Navbar/>
			<Content/>
		</div>
	)
}

export default App;