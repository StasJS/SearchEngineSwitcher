import { createWrapStore } from "webext-redux";
import store from "../store";

const wrapStore = createWrapStore();
wrapStore(store);
