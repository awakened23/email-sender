import { reduxForm, clearSubmitErrors } from "redux-form";
import { connect } from "react-redux";
import EmailSender from "../components/EmailSender"
import {sendEmail, resetSendStatus, requestToSendEmail} from "../modules/emailSender"

function mapStateToProps({emailSender: {isSending, isSuccessful}}) {
    return {
        isSending,
        isSuccessful
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestToSendEmail: () => dispatch(requestToSendEmail()),
        sendEmail: (email) => dispatch(sendEmail(email)),
        resetSendStatus: () => dispatch(resetSendStatus())
    };
}

export default reduxForm({
    form: "EmailSenderForm",
    onChange: (values, dispatch, props) => {
        if (props.submitFailed) dispatch(clearSubmitErrors('EmailSenderForm'));
    }
})(connect(mapStateToProps, mapDispatchToProps)(EmailSender));
