
const defaultTimings = {
    hour_begin: 8,
    hour_end: 17,
    directions: [],
};

export const timings = (state = defaultTimings, action) => {
    switch (action.type) {

        default:
            return state;

        case 'RECEIVE_TIMINGS':
            console.info('RECEIVE_TIMINGS reducer');
            if (!action.item) {
                return Object.assign({}, state, {directions: []});
            } else {
                return Object.assign({}, state, {directions: [
                    ...state.directions,
                    action.item
                ]});
            }
    }
};
