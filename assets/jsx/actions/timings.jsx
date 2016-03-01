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
            }, (status, result) => {
                console.info('DirectionsRoute Promise status', status);
                console.info('DirectionsRoute Promise result', result);
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
            const shifts = [60, -60];

            for (let shift of shifts) {
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
                    item.dit_begin = item.dir_begin.routes[0].legs[0].duration_in_traffic.value - dit;
                    item.dit_end = item.dir_end.routes[0].legs[0].duration_in_traffic.value - dit;
                    item.dit_total = item.dit_begin + item.dit_end;
                    item.value_per_unit = item.dit_total / Math.max(1, Math.abs(item.shift));
                    console.info('fetchTimings success');
                    dispatch(receiveTimings(item));
                })
                .catch(e => {
                    console.error(e);
                });
            }
        }
    }
};
