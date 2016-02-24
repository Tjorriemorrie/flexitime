const defaultLocations = {
    home: {
        address: '',
        suggestions: []
    },
    work: {
        address: '',
        suggestions: []
    }
};

export const locations = (state = defaultLocations, action) => {
    switch (action.type) {
        default:
            return state;
        case 'CHANGE_ADDRESS':
            return Object.assign({}, state, {
                [action.place]: Object.assign({}, state[action.place], {
                    address: action.text
                })
            });
    }
};
