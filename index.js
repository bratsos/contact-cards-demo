import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <p>Hello world!</p>
)

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);

export const configJson = {
  "title": "Contact List",
  "userUrl": "https://api.randomuser.me",
  "numberCards": 120,
  "tabs": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
};
