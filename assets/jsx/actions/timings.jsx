import moment from 'moment';


export const receiveTimings = (item) => {
    return {
        type: 'RECEIVE_TIMINGS',
        item
    }
};


const DirectionsRoute = (s, date) => {
    console.info('DirectionsRoute');
    return new Promise((resolve, reject) => {
        console.info('DirectionsRoute Promise');

        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
            {
                origin: s.locations.home.place.geometry.location,
                destination: s.locations.work.place.geometry.location,
                travelMode: google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: date,
                    trafficModel: google.maps.TrafficModel.PESSIMISTIC
                },
                provideRouteAlternatives: false,
                avoidHighways: false,
                avoidTolls: false,
                unitSystem: google.maps.UnitSystem.METRIC,
            }, (result, status) => {
                console.info('DirectionsRoute callback status', status);
                console.info('DirectionsRoute callback result', result);
                if (status === google.maps.DirectionsStatus.OK) {
                    return resolve(result);
                } else {
                    return reject(status);
                }
            }
        );
    });
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

            const dit = s.directions.routes[0].legs[0].duration_in_traffic.value;
            //const shifts = [120, 105, 90, 75, 60, 45, 30, 15];
            const shifts = [-15, -30];

            for (let shift of shifts) {
                setTimeout(() => {
                    const date_begin = moment().add(1, 'w').day(1).hour(8).startOf('hour').add(shift, 'm').toDate();
                    const date_end = moment().add(1, 'w').day(1).hour(17).startOf('hour').add(shift, 'm').toDate();
                    Promise.all([
                        DirectionsRoute(s, date_begin),
                        DirectionsRoute(s, date_end)
                    ]).then(responses => {
                        console.info('ds responses', responses);
                        let item = {
                            shift: shift,
                            dir_begin: responses[0],
                            dir_end: responses[1],
                        };
                        item.dit_begin = dit - item.dir_begin.routes[0].legs[0].duration_in_traffic.value;
                        item.dit_end = dit - item.dir_end.routes[0].legs[0].duration_in_traffic.value;
                        item.dit_total = item.dit_begin + item.dit_end;
                        item.value_per_unit = item.dit_total / Math.max(1, Math.abs(item.shift));
                        console.info('fetchTimings success');
                        dispatch(receiveTimings(item));
                    })
                    .catch(e => {
                        console.error(e);
                    });
                }, Math.abs(shift) * 200);
            }
        }
    }
};
