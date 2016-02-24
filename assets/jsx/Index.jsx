import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.jsx';
import Home from './home.jsx';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './reducers.jsx';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';


let routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
        </Route>
    </Router>
);


const store = createStore(
    Reducers,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        createLogger() // neat middleware that logs actions
    )
);


ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('app')
);
