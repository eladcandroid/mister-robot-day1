import React, { Component } from 'react';
// import logo from './logo.svg';
import Robots from './pages/Robots/Robots';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

import './App.scss';
import RobotDetails from './pages/RobotDetails/RobotDetails';
import RobotEdit from './pages/RobotEdit/RobotEdit';

const PrivateRoute = props => {
  return props.isAdmin ? <Route {...props} /> : <Redirect to="/login" />;
};

const About = () => {
  return (
    <div style={{ fontSize: '40px' }}>
      <br />
      <br />
      <br />
      About
    </div>
  );
};

class App extends Component {
  goBack = () => {};
  render() {
    return (
      <Router>
        <div>
          <navbar>
            <ul style={{ listStyle: 'none' }}>
              <NavLink exact to="/">
                <li>Home</li>
              </NavLink>
              <NavLink exact to="/about">
                <li>About</li>
              </NavLink>
            </ul>
          </navbar>

          <Switch>
            <Route path="/" exact component={Robots} />
            <Route path="/about" component={About} />
            <PrivateRoute
              isAdmin={true}
              path="/robot/edit/:id"
              component={RobotEdit}
            />
            <Route
              path="/robot/:id"
              render={props => {
                return <RobotDetails {...props} onClose={this.goBack} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
