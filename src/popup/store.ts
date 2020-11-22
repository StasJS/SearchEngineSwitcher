import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { save, load } from "redux-localstorage-simple";

const store = configureStore({
	reducer: rootReducer,
	middleware: (d) => d().concat(save()),
	preloadedState: load()
});

export default store;
