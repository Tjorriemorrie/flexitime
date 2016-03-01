import { connect } from 'react-redux';
import { changeAddress } from '../actions/locations.jsx';
import { fetchDirections } from '../actions/directions.jsx';
import { fetchTimings } from '../actions/timings.jsx';
import Locations from '../components/locations.jsx';

const mapStateToProps = (state) => {
    return {
        home: state.locations.home,
        work: state.locations.work,
        directions: state.directions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (places, place) => {
            dispatch(changeAddress(places, place));
            dispatch(fetchDirections());
        }
    }
};

const LocationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations);

export default LocationsContainer;
