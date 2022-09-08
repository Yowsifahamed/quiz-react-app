import React, { ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Column from './column/column';
import { Dashboard } from './dashboard/dashboard';
import { Footer } from './footer/footer';
import { Header } from './header/header';


function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setShowNav(true)
    }else{
      setShowNav(false)
    }
  });

  return (
    <>
      <BrowserRouter>
        <div className="App">
          { showNav && <Header/> }
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quiz/:name" element={ <Column/> } />
          </Routes>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
