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
    optimizeWaypoints: true,
};


const getRouteBegin = (s, shift, waypts, dispatch) => {
    console.info('getRouteBegin');

    const ds = new google.maps.DirectionsService();
    const config_begin = Object.assign({}, config_default, {
        origin: s.locations.home.place.geometry.location,
        destination: s.locations.work.place.geometry.location,
        drivingOptions: {
            departureTime: moment().add(1, 'w').day(1).hour(6).startOf('hour').add(shift, 'm').toDate(),
            trafficModel: google.maps.TrafficModel.PESSIMISTIC
        },
        waypoints: waypts,
    });

    ds.route(config_begin, (result, status) => {
        console.info('getRouteBegin callback status', status);
        console.info('getRouteBegin callback result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            setTimeout(() => {
                getRouteEnd(s, shift, result, waypts, dispatch);
            }, Math.abs(shift) * 100);
        } else {
            console.error(status);
        }
    });
};


const getRouteEnd = (s, shift, route_begin, waypts, dispatch) => {
    console.info('getRouteEnd');

    const departTime = route_begin.request.drivingOptions.departureTime;
    const durationTime = route_begin.routes[0].legs[0].duration_in_traffic.value;

    const ds = new google.maps.DirectionsService();
    const config_end = Object.assign({}, config_default, {
        origin: s.locations.work.place.geometry.location,
        destination: s.locations.home.place.geometry.location,
        drivingOptions: {
            departureTime: moment(departTime).add(9, 'h').add(durationTime, 's').toDate(),
            trafficModel: google.maps.TrafficModel.PESSIMISTIC
        },
        waypoints: waypts,
    });

    ds.route(config_end, (result, status) => {
        //console.info('getRouteEnd callback status', status);
        //console.info('getRouteEnd callback result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            //parseRoutes(s, shift, route_begin, result, dispatch);
            dispatch(receiveTimings({
                dir_begin: route_begin,
                dir_end: result,
            }));
        } else {
            console.error(status);
        }
    });
};


//const parseRoutes = (s, shift, route_begin, route_end, dispatch) => {
//    console.info('parseRoutes');
//
//    let item = {
//        shift: shift,
//        dir_begin: route_begin,
//        dir_end: route_end,
//    };
//    //item.dit_begin = item.dir_begin.routes[0].legs[0].duration_in_traffic.value - dit;
//    //item.dit_end = item.dir_end.routes[0].legs[0].duration_in_traffic.value - dit;
//    //item.dit_total = item.dit_begin + item.dit_end;
//    //item.value_per_unit = item.dit_total / Math.max(1, Math.abs(item.shift));
//    dispatch(receiveTimings(item));
//};


export const fetchTimings = () => {
    return function (dispatch, getState) {
        console.info('fetchTimings action');
        let s = getState();
        if (!s.directions.routes) {
            console.info('directions not valid');
            dispatch(receiveTimings(null));
        } else {
            console.info('all directions valid, get timings');

            // set route as waypoints to always use same route
            let waypts = [];
            const wayptInterval = Math.round(s.directions.routes[0].overview_path.length / 10);
            for (let i = wayptInterval; i < s.directions.routes[0].overview_path.length; i += wayptInterval) {
                waypts.push({
                    location: s.directions.routes[0].overview_path[i]
                });
            }
            console.info('waypts', waypts.length, waypts);

            for (let shift = 0; shift <= 150; shift += 15) {
                setTimeout(() => {
                    getRouteBegin(s, shift, waypts, dispatch);
                }, Math.abs(shift) * 100);
            }
        }
    }
};
