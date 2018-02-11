import React, { Component } from 'react';
import { Field, SubmissionError } from "redux-form";
import _ from "lodash";
import {GridContainer, Grid, Cell, Button} from 'react-foundation';
import Spinner from './Spinner';

class EmailSender extends Component {

    renderTextBox(field) {
        const { meta: { error } } = field;

        return (
            <Grid>
                <Cell className="shrink">
                  <label htmlFor="middle-label" className="field-label middle">{field.label}</label>
                </Cell>
                <Cell className="auto">
                  <input type="text" id="middle-label" {...field.input}/>
                  <div className="field-error-text">
                      {error && error !== 'hiddenError' ? error : ''}
                  </div>
                </Cell>
            </Grid>
        );
    }

    renderTextArea(field) {
        return (
            <Grid>
                <Cell>
                    <textarea {...field.input} />
                </Cell>
            </Grid>
        );
    }

    findInvalidEmail(value){
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const emails = value.split(/\s|,|;/);

        return emails.find((email)=> email && !emailRegex.test(email));
    }

    validateEmail(value, fieldName, errors){
        const invalidEmail = this.findInvalidEmail(value);
        if(invalidEmail){
            errors._error = 'Please make sure that all addresses are properly formed.';
            errors[fieldName] = `The address "${invalidEmail}" was not recognized.`;
        }
    }

    trimValues(values){
        values.to = _.trim(values.to);
        values.cc = _.trim(values.cc);
        values.bcc = _.trim(values.bcc);
        values.subject = _.trim(values.subject);
    }

    validate(values) {
        const errors = {};

        if (!values.to && !values.cc && !values.bcc) {
            errors._error = 'Please specify at least one recipient.';
        }else{
            if(values.to){
                this.validateEmail(values.to, "to", errors);
            }
            if(values.cc){
                this.validateEmail(values.cc, "cc", errors);
            }
            if(values.bcc){
                this.validateEmail(values.bcc, "bcc", errors);
            }
            if(_.isEmpty(errors) && !values.subject && !values.content) {
                if(!window.confirm('Send this message without a subject or text in the body?')){
                    errors.subject = 'hiddenError';
                }
            }
        }

        return errors;
    }

    getCommaSeparatedEmails(emails){
        return emails
            .split(/\s|,|;/)
            .filter((email) => email)
            .join(', ');
    }

    onSubmit(values) {
        const {requestToSendEmail, sendEmail, resetSendStatus} = this.props;

        resetSendStatus();
        requestToSendEmail();
        this.trimValues(values);
        const errors = this.validate(values);

        if(_.isEmpty(errors)){
            if(values.to){
                values.to = this.getCommaSeparatedEmails(values.to);
            }
            if(values.cc){
                values.cc = this.getCommaSeparatedEmails(values.cc);
            }
            if(values.bcc){
                values.bcc = this.getCommaSeparatedEmails(values.bcc);
            }
            console.log('----------values to submit', values);
            //this is to simulate slow backend
            //setTimeout(function(){
                sendEmail(values);
            //}, 2000);

        }else{
            resetSendStatus();
            console.log('------------errors', errors);
            throw new SubmissionError(errors);
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isSuccessful !== nextProps.isSuccessful){
            if(nextProps.isSuccessful){
                this.props.reset();
            }
        }
    }

    handleFieldOnChange(){
        const {isSuccessful, resetSendStatus} = this.props;
        if(isSuccessful !== undefined){
            resetSendStatus();
        }
    }

    renderGeneralMessage(message, className){
        return (
            <Grid>
                <Cell className={className}>
                    {message}
                </Cell>
            </Grid>
        );
    }

    renderForm(){
        return(
            <Grid>
                <Cell>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="To"
                            name="to"
                            component={this.renderTextBox}
                            onChange={this.handleFieldOnChange.bind(this)}
                        />
                        <Field
                            label="Cc"
                            name="cc"
                            component={this.renderTextBox}
                            onChange={this.handleFieldOnChange.bind(this)}
                        />
                        <Field
                            label="Bcc"
                            name="bcc"
                            component={this.renderTextBox}
                            onChange={this.handleFieldOnChange.bind(this)}
                        />
                        <Field
                            label="Subject"
                            name="subject"
                            component={this.renderTextBox}
                            onChange={this.handleFieldOnChange.bind(this)}
                        />
                        <Field
                            name="content"
                            component={this.renderTextArea}
                            onChange={this.handleFieldOnChange.bind(this)}
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </Cell>
            </Grid>
        );
    }
    render() {
        const { error, submitFailed, isSuccessful, isSending } = this.props;
        return (
            <GridContainer className="email-sender-box">

                {submitFailed && error ? this.renderGeneralMessage(error, 'general-error-message')  : ''}
                {isSuccessful === true ? this.renderGeneralMessage('The email was sent successfully.', 'general-success-message') : ''}
                {isSuccessful === false ? this.renderGeneralMessage('There was an error sending your email.', 'general-error-message') : ''}

                {isSending === true? <Spinner/>: this.renderForm()}

            </GridContainer>
        );
    }
}

export default EmailSender;
