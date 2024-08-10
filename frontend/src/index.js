import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Recipe, Search } from "./App";
import reportWebVitals from "./reportWebVitals";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: Search,
      data: null,
    };
  }

  setComponent(component, data) {
    this.setState((p) => ({
      component: component,
      data: data,
    }));
  }

  render() {
    let Component = this.state.component;
    return <Component root={this} data={this.state.data}></Component>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main></Main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
