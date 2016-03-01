const defaultDirections = {};

export const directions = (state = defaultDirections, action) => {
    switch (action.type) {

        default:
            return state;

        case 'RECEIVE_DIRECTIONS':
            console.info('RECEIVE_DIRECTIONS reducer');
            return Object.assign({}, state, action.directions);

    }
};
