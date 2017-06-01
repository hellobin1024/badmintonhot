/**
 * Created by dingyiming on 2017/2/15.
 */
// import * as types from '../action/types';
import {
    ACCESS_TOKEN_ACK
} from '../constants/UserConstants';
//
// import {
//     UPDATE_TTS_TOKEN
// } from '../constants/TTSConstants';



const initialState = {
    accessToken: null,
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case ACCESS_TOKEN_ACK:

            return Object.assign({}, state, {
                accessToken: action.accessToken,

            })
            break;
        default:
            return state;
    }
}

export default user;