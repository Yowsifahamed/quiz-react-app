import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizComponent from './column/QuizComponent';
import { Dashboard } from './dashboard/dashboard';
import { Footer } from './footer/footer';
import { Header } from './header/header';


function App() {
  const quizComponentPath: any = {
      component : `${ QuizComponent }`
  };

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quiz/:name" element={ quizComponentPath.component } />
          </Routes>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
