import fetchSuggestions from '../actions/locations.jsx';


const defaultLocations = {
    home: {
        place: null,
    },
    work: {
        place: null,
    }
};

export const locations = (state = defaultLocations, action) => {
    switch (action.type) {
        default:
            return state;

        case 'CHANGE_ADDRESS':
            let place = (action.places.length == 1 && action.places[0].geometry) ? action.places[0] : null;
            return Object.assign({}, state, {
                [action.oridest]: Object.assign({}, state[action.oridest], {
                    place: place
                })
            });

    }
};
