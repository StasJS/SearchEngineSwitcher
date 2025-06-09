import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { Store } from "webext-redux";

const store = new Store();

store.ready().then(() => {
	const rootElement = document.getElementById("root")!;
	const root = createRoot(rootElement);
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
