import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import emailSender from "./modules/emailSender"

const rootReducer = combineReducers({
    form: formReducer,
    emailSender
});

export default rootReducer;
