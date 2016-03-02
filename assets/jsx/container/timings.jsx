import { connect } from 'react-redux';
import moment from 'moment';
import TimingsView from '../components/timings.jsx';


const timingsOrdered = (state) => {
    // exit if empty
    let directions = state.timings.directions;
    if (!directions.length) {
        return [];
    }

    // get maximum traffic time
    let max_dit_begin = 0;
    for (let direction of directions) {
        if (direction.dir_begin.routes[0].legs[0].duration_in_traffic.value > max_dit_begin) {
            max_dit_begin = direction.dir_begin.routes[0].legs[0].duration_in_traffic.value;
        }
    }
    let max_dit_end = 0;
    for (let direction of directions) {
        if (direction.dir_end.routes[0].legs[0].duration_in_traffic.value > max_dit_end) {
            max_dit_end = direction.dir_end.routes[0].legs[0].duration_in_traffic.value;
        }
    }
    console.info('Max DITs', max_dit_begin, max_dit_end);

    // calculate vpu
    for (let direction of directions) {
        let gain_begin = max_dit_begin - direction.dir_begin.routes[0].legs[0].duration_in_traffic.value;
        let gain_end = max_dit_end - direction.dir_end.routes[0].legs[0].duration_in_traffic.value;
        let gain = gain_begin + gain_end;
        direction.vpu = gain * 10 / Math.max(1, Math.abs(direction.shift));
    }

    // order by v/u
    return directions.sort(function(a, b) {
       return parseFloat(b.vpu) - parseFloat(a.vpu);
    });
};

const mapStateToProps = (state) => {
    return {
        directions: timingsOrdered(state)
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
