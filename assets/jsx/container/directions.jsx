import { connect } from 'react-redux';
import { routeSelected } from '../actions/locations.jsx';
import InfoView from '../components/info.jsx';


const mapStateToProps = (state) => {
    return {
        home: state.locations.home,
        work: state.locations.work,
        directions: state.directions
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onRouteSelect: (route) => {
            dispatch(routeSelected(route));
        }
    }
};

const InfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoView);


export default InfoContainer;
