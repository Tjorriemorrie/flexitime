import { connect } from 'react-redux';
import TimingsView from '../components/timings.jsx';


const mapStateToProps = (state) => {
    return {
        timings: state.timings
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const TimingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimingsView);


export default TimingsContainer;
