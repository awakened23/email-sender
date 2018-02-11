import axios from "axios";

export function sendEmail(dispatch, email, actionCreator){
    axios.post(process.env.REACT_APP_API_PATH ||'http://localhost:3005/sendEmail', email)
    .then(response => {
        dispatch(actionCreator({isSuccessful: true}));
    })
    .catch(error => {
        console.log(error);
        dispatch(actionCreator({isSuccessful: false}));
    });
}
