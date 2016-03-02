import moment from 'moment';


export const receiveTimings = (item) => {
    return {
        type: 'RECEIVE_TIMINGS',
        item
    }
};


const config_default = {
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
    avoidHighways: false,
    avoidTolls: false,
    unitSystem: google.maps.UnitSystem.METRIC,
};


const filterMostSimilarRoute = (normal_route, result) => {
    let route_scores = [];
    let score;
    for (let result_route of result.routes) {
        score = 0;
        for (let result_path in result_route.overview_path) {
            let result_path_latlng = new google.maps.LatLng(result_path);
            //console.info('resultpathlatlng', result_path_latlng);
            for (let normal_path of normal_route.overview_path) {
                let normal_path_latlng = new google.maps.LatLng(normal_path);
                //console.info('normal_path_latlng', normal_path_latlng);
                if (normal_path_latlng.equals(result_path_latlng)) {
                    score += 1;
                    break;
                }
            }
            break;
        }
        route_scores.push(score);
    }
    console.info('scores', route_scores);
    return route_scores;
};


const getRouteBegin = (s, shift, dispatch) => {
    console.info('getRouteBegin');

    const ds = new google.maps.DirectionsService();
    const config_begin = Object.assign({}, config_default, {
        origin: s.locations.home.place.geometry.location,
        destination: s.locations.work.place.geometry.location,
        drivingOptions: {
            departureTime: moment().add(1, 'w').day(1).hour(6).startOf('hour').add(shift, 'm').toDate(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS
        },
    });

    ds.route(config_begin, (result, status) => {
        //console.info('getRouteBegin callback status', status);
        //console.info('getRouteBegin callback result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            //let route_scores = filterMostSimilarRoute(s.directions.routes[0], result);
            getRouteEnd(s, shift, result, dispatch);
        } else {
            console.error(status);
        }
    });
};


const getRouteEnd = (s, shift, route_begin, dispatch) => {
    console.info('getRouteEnd');

    const departTime = route_begin.request.drivingOptions.departureTime;
    const durationTime = route_begin.routes[0].legs[0].duration_in_traffic.value;

    const ds = new google.maps.DirectionsService();
    const config_end = Object.assign({}, config_default, {
        origin: s.locations.work.place.geometry.location,
        destination: s.locations.home.place.geometry.location,
        drivingOptions: {
            departureTime: moment(departTime).add(9, 'h').add(durationTime, 's').toDate(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS
        },
    });

    ds.route(config_end, (result, status) => {
        //console.info('getRouteEnd callback status', status);
        //console.info('getRouteEnd callback result', result);
        if (status === google.maps.DirectionsStatus.OK) {
            //parseRoutes(s, shift, route_begin, result, dispatch);
            let end_date = moment(result.request.drivingOptions.departureTime);
            let five = moment(end_date).hour(17).startOf('hour');
            //console.log(end_date);
            //console.log(five);
            dispatch(receiveTimings({
                shift: moment.duration(end_date.diff(five)).asMinutes(),
                dir_begin: route_begin,
                dir_end: result,
            }));
        } else {
            console.error(status);
        }
    });
};


export const fetchTimings = () => {
    return function (dispatch, getState) {
        console.info('fetchTimings action');
        dispatch(receiveTimings(null));

        let s = getState();
        if (!s.directions.routes) {
            console.info('directions not valid');
        }

        else {
            console.info('all directions valid, get timings');

            for (let shift = 0; shift <= 150; shift += 15) {
                setTimeout(() => {
                    getRouteBegin(s, shift, dispatch);
                }, Math.abs(shift) * 150);
            }
        }
    }
};
