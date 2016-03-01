import moment from 'moment';
import { fetchTimings } from './timings.jsx';


export const receiveDirections = (directions) => {
    return {
        type: 'RECEIVE_DIRECTIONS',
        directions
    }
};

export const fetchDirections = () => {
    return function (dispatch, getState) {
        console.info('fetchDirections action');
        let locs = getState().locations;
        if (!locs.home.place || !locs.work.place) {
            console.info('places not valid');
            dispatch(receiveDirections(null));
        } else {
            console.info('all places valid, get directions');
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: locs.home.place.geometry.location,
                destination: locs.work.place.geometry.location,
                travelMode: google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: moment().add(1, 'w').day(1).hour(8).startOf('hour').toDate(),
                    trafficModel: google.maps.TrafficModel.PESSIMISTIC
                },
                provideRouteAlternatives: false,
                avoidHighways: false,
                avoidTolls: false,
                unitSystem: google.maps.UnitSystem.METRIC,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.info('fetchDirections success');
                    dispatch(receiveDirections(result));
                    dispatch(fetchTimings());
                } else {
                    console.error(`error fetching directions ${ result }`);
                }
            });
        }
    }
};
