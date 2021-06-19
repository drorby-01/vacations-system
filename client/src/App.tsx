import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './pages/registration-page/Register';
import Router from './Router/Router';
import AppNavBar from './Component/AppNavBar/AppNavBar';

function App() {
  return (<>
  <AppNavBar/>
  <Router/>
  </>
  );
}

export default App;
