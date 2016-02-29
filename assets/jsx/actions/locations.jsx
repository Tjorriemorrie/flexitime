import moment from 'moment';


export const changeAddress = (places, oridest) => {
    return {
        type: 'CHANGE_ADDRESS',
        places,
        oridest
    }
};

export const receiveDirections = (directions) => {
    return {
        type: 'RECEIVE_DIRECTIONS',
        directions
    }
};

export const fetchDirections = () => {
    return function (dispatch, getState) {
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
                    departureTime: moment().add(1, 'days').hour(8).toDate(),
                    trafficModel: google.maps.TrafficModel.PESSIMISTIC
                },
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: false,
                unitSystem: google.maps.UnitSystem.METRIC,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    dispatch(receiveDirections(result));
                } else {
                    console.error(`error fetching directions ${ result }`);
                }
            });
        }
    }
};

export const routeSelected = (route) => {
    return {
        type: 'ROUTE_SELECTED',
        route
    }
};
