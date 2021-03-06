import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chat from './Chat';
import Home from './Home'
import Login from './Login'
import Register from './Register/index'


function App() {
  return (
    <Router>
        <Switch >
      <Route path="/" component={Home} exact></Route>
      <Route path="/login" component={Login} exact></Route>
      <Route path="/register" component={Register} exact></Route>
      <Route path="/chat" component={Chat} exact></Route>
        </Switch>
    </Router>
  );
}

export default App;
