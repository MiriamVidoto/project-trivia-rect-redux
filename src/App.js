import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <Switch>
        <Route to="/" component={ Login } />
      </Switch>
    </div>
  );
}
