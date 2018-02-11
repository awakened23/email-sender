import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import './index.css';
import ConnectedEmailSender from './connectors/ConnectedEmailSender';
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <ConnectedEmailSender />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
