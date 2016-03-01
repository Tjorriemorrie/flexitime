import moment from 'moment';


export const receiveTimings = (item) => {
    return {
        type: 'RECEIVE_TIMINGS',
        item
    }
};


const config_default = {
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: false,
    avoidHighways: false,
    avoidTolls: false,
    unitSystem: google.maps.UnitSystem.METRIC,
};

const getRouteBegin = (ds, s, shift) => {
    console.info('getRouteBegin');

    const config_begin = Object.assign({}, config_default, {
        origin: s.locations.home.place.geometry.location,
        destination: s.locations.work.place.geometry.location,
        drivingOptions: {
            departureTime: moment().add(1, 'w').day(1).hour(8).startOf('hour').add(shift, 'm').toDate(),
            trafficModel: google.maps.TrafficModel.PESSIMISTIC
        }
    });

    ds.route(config_begin, (status, result) => {
        console.info('getRouteBegin Promise status', status);
        console.info('getRouteBegin Promise result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            getRouteEnd(ds, s, shift, result);
        } else {
            console.error(status);
        }
    });
};


const getRouteEnd = (ds, s, shift, route_begin) => {
    console.info('getRouteEnd');
    const config_end = Object.assign({}, config_default, {
        origin: s.locations.work.place.geometry.location,
        destination: s.locations.home.place.geometry.location,
        drivingOptions: {
            departureTime: moment().add(1, 'w').day(1).hour(17).startOf('hour').add(shift, 'm').toDate(),
            trafficModel: google.maps.TrafficModel.PESSIMISTIC
        }
    });

    ds.route(config_end, (status, result) => {
        console.info('getRouteEnd Promise status', status);
        console.info('getRouteEnd Promise result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            parseRoutes(s, shift, route_begin, result);
        } else {
            console.error(status);
        }
    });
};


const parseRoutes = (s, shift, route_begin, route_end) => {
    console.info('parseRoutes');
    const dit = s.directions.routes[0].legs[0].duration_in_traffic.value;
    let item = {
        shift: shift,
        dir_begin: route_begin,
        dir_end: route_end,
    };
    item.dit_begin = item.dir_begin.routes[0].legs[0].duration_in_traffic.value - dit;
    item.dit_end = item.dir_end.routes[0].legs[0].duration_in_traffic.value - dit;
    item.dit_total = item.dit_begin + item.dit_end;
    item.value_per_unit = item.dit_total / Math.max(1, Math.abs(item.shift));
    dispatch(receiveTimings(item));
};


export const fetchTimings = () => {
    return function (dispatch, getState) {
        console.info('fetchTimings action');
        let s = getState();
        if (!s.directions.routes) {
            console.info('directions not valid');
            dispatch(receiveTimings(null));
        } else {
            console.info('all directions valid, get timings');

            const ds = new google.maps.DirectionsService();
            const shifts = [60];

            for (let shift of shifts) {
                getRouteBegin(ds, s, shift, config_default);
            }
        }
    }
};
