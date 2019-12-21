import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <p>Hello world!</p>
)

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);

