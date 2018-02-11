import * as apiService from "../services/apiService";

const REQUEST_TO_SEND_EMAIL = 'REQUEST_TO_SEND_EMAIL';
const RECEIVE_SEND_RESPONSE = 'RECEIVE_SEND_RESPONSE';
const RESET_SEND_STATUS = 'RESET_SEND_STATUS';

export function requestToSendEmail(){
    return {
        type: REQUEST_TO_SEND_EMAIL
    }
}

export function receiveSendResponse(json){
    return {
        type: RECEIVE_SEND_RESPONSE,
        isSuccessful: json.isSuccessful
    }
}

export function resetSendStatus(){
    return {
        type: RESET_SEND_STATUS
    }
}

export function sendEmail(email){
    return (dispatch) => {
        apiService.sendEmail(dispatch, email, receiveSendResponse);
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_TO_SEND_EMAIL:
            return {
                ...state, isSending: true
            };
        case RECEIVE_SEND_RESPONSE:
            return {
                ...state,
                isSending: false,
                isSuccessful: action.isSuccessful,
            };
        case RESET_SEND_STATUS:
            return {};
        default:
            return state;
    }
}
