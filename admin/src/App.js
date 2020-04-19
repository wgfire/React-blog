import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./page/login";
import AdminIndex from "./page/AdminIndex";

function App() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" exact component={AdminIndex} />
     
    </Router>
  );
}
export default App;
