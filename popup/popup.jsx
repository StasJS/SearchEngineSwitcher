import { h, render } from 'preact';
import * as App from "./components/App";

console.log("test");
var h1 = document.createElement("h1");
h1.textContent = "TEST";
document.body.appendChild(h1);
render(App, document.body);