import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./page/login";
import AdminIndex from "./page/AdminIndex";
import moment from 'moment';
// 推荐在入口文件全局设置 
 import 'moment/locale/zh-cn';
moment.locale('zh-cn');
function App() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
      <Route path="/index/"  component={AdminIndex} />
     
    </Router>
  );
}
export default App;
