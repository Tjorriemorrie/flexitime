import { connect } from 'react-redux';
import { changeAddress } from './actions.jsx';
import Locations from './locations.jsx';

const mapStateToProps = (state) => {
    return {
        home: state.locations.home,
        work: state.locations.work
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (text, place) => {
            dispatch(changeAddress(text, place))
        }
    }
};

const LocationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations);

export default LocationsContainer;
