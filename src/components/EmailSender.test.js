import React from 'react';
import EmailSender from './EmailSender';
import {shallow, mount} from 'enzyme';
import { Field, SubmissionError } from "redux-form";
import {Button} from 'react-foundation';
import ConnectedEmailSender from '../connectors/ConnectedEmailSender';
import { Provider } from "react-redux";

describe('EmailSender', () => {

    const requestToSendEmail = jest.fn();
    const sendEmail = jest.fn();
    const resetSendStatus = jest.fn();
    const handleSubmit = jest.fn();

    const props = {
        requestToSendEmail,
        sendEmail,
        resetSendStatus,
        handleSubmit
    }

    beforeEach(() => {
        requestToSendEmail.mockClear();
        sendEmail.mockClear();
        resetSendStatus.mockClear();
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<EmailSender {...props}/>);
        expect(wrapper.find('Field[name="to"]')).toHaveLength(1);
        expect(wrapper.find('Field[name="cc"]')).toHaveLength(1);
        expect(wrapper.find('Field[name="bcc"]')).toHaveLength(1);
        expect(wrapper.find('Field[name="subject"]')).toHaveLength(1);
        expect(wrapper.find('Field[name="content"]')).toHaveLength(1);
        expect(wrapper.find(Button).render().text()).toEqual('Send');
    });

    describe('onSubmit', () => {
        it('calls sendEmail when valid values are entered', () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            wrapper.instance().onSubmit({to: 'asdf@sdfdf.sdff', subject: 'Test'});
            expect(sendEmail).toHaveBeenCalledWith({to: 'asdf@sdfdf.sdff', subject: 'Test', cc: '', bcc: ''});
        });

        it("throws an error when there is an invalid email in To field", () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            expect(wrapper.instance().onSubmit.bind(wrapper.instance() ,{to: 'asdf@sdfdf.s', subject: 'Test'}))
            .toThrowError(SubmissionError);
        });

        it("throws an error when there is an invalid email in cc field", () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            expect(wrapper.instance().onSubmit.bind(wrapper.instance() ,{cc: 'asdfsdfdf.s', subject: 'Test'}))
            .toThrowError(SubmissionError);
        });

        it("throws an error when there is an invalid email in bcc field", () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            expect(wrapper.instance().onSubmit.bind(wrapper.instance() ,{bcc: 'asdf@sdfdf.', subject: 'Test'}))
            .toThrowError(SubmissionError);
        });

        it("throws an error when there is no recipient", () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            expect(wrapper.instance().onSubmit.bind(wrapper.instance() ,{subject: 'Test'}))
            .toThrowError(SubmissionError);
        });

        it("calls window.confirm when there is no subject or content", () => {
            const wrapper = shallow(<EmailSender {...props}/>);
            window.confirm = jest.fn(() => true);
            wrapper.instance().onSubmit({to: 'asdf@sdfdf.sdf'});
            expect(window.confirm).toHaveBeenCalledWith('Send this message without a subject or text in the body?');
        });
    });
});
