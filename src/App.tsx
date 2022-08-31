import React from 'react';
import './App.css';
import { Dashboard } from './dashboard/dashboard';
import { Footer } from './footer/footer';
import { Header } from './header/header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
      <Footer></Footer>
    </div>
  );
}

export default App;
