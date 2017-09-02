

import {
    STORE_INFO,

} from '../constants/PageConstants';




const initialState = {
    competitionId: null,


};

let page = (state = initialState, action) => {

    switch (action.type) {

        case STORE_INFO:

            return Object.assign({}, state, {
                competitionId: action.competitionId,

            })
            break;

        default:
            return state;
    }
}

export default page;