import reducer, {requestToSendEmail, receiveSendResponse, resetSendStatus, sendEmail} from './emailSender';
import * as apiService from "../services/apiService";

describe('action creators', () => {

    describe('requestToSendEmail', () => {
        it('returns REQUEST_TO_SEND_EMAIL action', () => {
            const action = requestToSendEmail();
            expect(action.type).toEqual('REQUEST_TO_SEND_EMAIL');
        });
    });

    describe('receiveSendResponse', () => {
        const json = {
            isSuccessful: true
        }

        it('returns RECEIVE_SEND_RESPONSE action', () => {
            const action = receiveSendResponse(json);
            expect(action.type).toEqual('RECEIVE_SEND_RESPONSE');
            expect(action.isSuccessful).toEqual(true);
        });
    });

    describe('resetSendStatus', () => {
        it('returns RESET_SEND_STATUS action', () => {
            const action = resetSendStatus();
            expect(action.type).toEqual('RESET_SEND_STATUS');
        });
    })
});

describe('sendEmail', () => {

    it('calls sendEmail with correct parameters', () => {
        const fetchAction = sendEmail('email');
        apiService.sendEmail = jest.fn();
        fetchAction('dispatch');
        expect(apiService.sendEmail).toHaveBeenCalledWith('dispatch', 'email', receiveSendResponse);
    });
});

describe('reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('handles REQUEST_TO_SEND_EMAIL', () => {
        expect(reducer({}, {
            type: 'REQUEST_TO_SEND_EMAIL'
        })).toEqual({
            isSending: true
        });
    });

    it('handles RECEIVE_SEND_RESPONSE', () => {
        expect(reducer({}, {
            type: 'RECEIVE_SEND_RESPONSE',
            isSuccessful: true
        })).toEqual({
            isSuccessful: true,
            isSending: false
        });
    });

    it('handles RESET_SEND_STATUS', () => {
        expect(reducer({isSuccessful: false}, {
            type: 'RESET_SEND_STATUS'
        })).toEqual({});
    });
});
