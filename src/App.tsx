import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './dashboard/dashboard';
import { Footer } from './footer/footer';
import { Header } from './header/header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Dashboard></Dashboard>
          <Footer></Footer>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:roleName" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
