import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Router, Route, IndexRoute} from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';


let routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
        </Route>
    </Router>
);

let history = createBrowserHistory();

const el = document.getElementById('app');

ReactDOM.render(<Router routes={routes} history={history}/>, el);
