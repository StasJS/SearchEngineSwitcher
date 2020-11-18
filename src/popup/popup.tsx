import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.getElementById("root")!
);
