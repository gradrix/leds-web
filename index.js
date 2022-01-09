import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from "./leds-client/redux/store";
import LedsClient from './leds-client/LedsClient';

const appElement = document.getElementById("LedsClient");
ReactDOM.render(
  <Provider store={store}>
    <LedsClient serviceIndex={1} />
  </Provider>,
  appElement
);