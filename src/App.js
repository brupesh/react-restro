// import React from 'react';
// import logo from './logo.svg';
// import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import restaurant from "./components/restaurant";
import login from "./components/login";
import logout from "./components/logout";
import otpVerification from "./components/otp-verification";

class App extends Component {
  render() {
    // if()
    return (
      
          <div>
      <Router>
            <Switch>
              {/* <Route exact path={["/", "/restaurants"]} component={restaurantsList} /> */}
              <Route exact path="/" component={login} />
              <Route exact path="/logout" component={logout} />
              <Route exact path="/otp" component={otpVerification} />
              <Route exact path="/restaurant" component={restaurant} />
            </Switch>
      </Router>
          </div>
    );
  }
}


export default App;
