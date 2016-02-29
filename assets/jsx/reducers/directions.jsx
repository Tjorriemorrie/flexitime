import fetchSuggestions from '../actions/locations.jsx';


const defaultDirections = {
    directions: null,
    route: null
};

export const directions = (state = defaultDirections, action) => {
    switch (action.type) {

        default:
            return state;

        case 'RECEIVE_DIRECTIONS':
            return Object.assign({}, state, {
                directions: action.directions
            });

        case 'ROUTE_SELECTED':
            return Object.assign({}, state, {
                route: action.route
            });

    }
};
