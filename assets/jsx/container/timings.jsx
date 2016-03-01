import { connect } from 'react-redux';
import TimingsView from '../components/timings.jsx';


const timingsOrdered = (directions) => {
    return directions.sort(function(a, b) {
       return parseFloat(a.shift) - parseFloat(b.shift);
    });
};

const mapStateToProps = (state) => {
    return {
        directions: timingsOrdered(state.timings.directions)
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
