import { combineReducers } from 'redux';
import { locations } from './reducers/locations.jsx';
import { directions } from './reducers/directions.jsx';
import { timings } from './reducers/timings.jsx';

const Reducers = combineReducers({
    locations,
    directions,
    timings
});

export default Reducers;
