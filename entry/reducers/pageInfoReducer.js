

import {
    STORE_INFO,

} from '../constants/PageConstants';




const initialState = {
    id: null,


};

let page = (state = initialState, action) => {

    switch (action.type) {

        case STORE_INFO:

            return Object.assign({}, state, {
                id: action.id,

            })
            break;

        default:
            return state;
    }
}

export default page;