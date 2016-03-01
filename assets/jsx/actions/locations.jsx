import moment from 'moment';


export const changeAddress = (places, oridest) => {
    return {
        type: 'CHANGE_ADDRESS',
        places,
        oridest
    }
};

export const routeSelected = (route) => {
    return {
        type: 'ROUTE_SELECTED',
        route
    }
};
