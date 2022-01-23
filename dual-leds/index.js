import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from "../leds-client/redux/store";
import { buildLedsClient } from '../leds-client/LedsClient';
import './LedsClient.scss';

const FrontClient = buildLedsClient(1);
const BackClient = buildLedsClient(2);

ReactDOM.render(
  <Provider store={store}>
    <FrontClient serviceIndex={1} />
  </Provider>,
  document.getElementById("LedsClientFront")
);
ReactDOM.render(
  <Provider store={store}>
    <BackClient serviceIndex={2} />
  </Provider>,
  document.getElementById("LedsClientBack")
);

// ReactDOM.render(
//   [
//     <Provider store={initStore(1)}>
//       <LedsClient serviceIndex={1} />
//     </Provider>,
//     <Provider store={initStore(2)}>
//       <LedsClient serviceIndex={2} />
//     </Provider>
//   ],
//   document.getElementById("LedsClientFront")
// );