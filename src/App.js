import React from "react";
import Layout from "./Layout/Layout";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
