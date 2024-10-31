import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Play from './Play';
import Home from './Home'
import About from './About'
import Examples from './Examples'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/about" element={<About />} />
      <Route path="/examples" element={<Examples />} />
    </Routes>
  );
}

export default App;
