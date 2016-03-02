import { connect } from 'react-redux';
import moment from 'moment';
import TimingsView from '../components/timings.jsx';


const timingsOrdered = (state) => {
    //const shortest time
    //let max_other_dit = 0;
    //for (direction of s.timings.directions) {
    //    if (direction.dir_begin.routes[0].legs[0].duration_in_traffic.value > max_other_dit) {
    //        max_other_dit = direction.routes[0].legs[0].duration_in_traffic.value;
    //    }
    //    if (direction.dir_end.routes[0].legs[0].duration_in_traffic.value > max_other_dit) {
    //        max_other_dit = direction.routes[0].legs[0].duration_in_traffic.value;
    //    }
    //}
    //max_other_dit = Math.max(
    //    max_other_dit,
    //    route_begin.routes[0].legs[0].duration_in_traffic.value,
    //    route_end.routes[0].legs[0].duration_in_traffic.value
    //);
    //console.info('Max DIT', max_other_dit);
    //
    //// order by v/u
    //direction = directions.sort(function(a, b) {
    //   return parseFloat(a.shift) - parseFloat(b.shift);
    //});

    return state.timings.directions;
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
