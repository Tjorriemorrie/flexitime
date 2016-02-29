import { combineReducers } from 'redux';
import { locations } from './reducers/locations.jsx';
import { directions } from './reducers/directions.jsx';

const Reducers = combineReducers({
    locations,
    directions
});

export default Reducers;
