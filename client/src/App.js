import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import WelcomeCanvas from './WelcomeCanvas';
import Admin from './Admin';
import './App.css';
// import Login from './loginButton';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-container" className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Route exact path="/" component={WelcomeCanvas} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
