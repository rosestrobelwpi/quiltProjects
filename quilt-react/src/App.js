import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Play from './Play';
import Home from './Home';
import About from './About';
import Examples from './Examples';
import GettingStarted from './docs/GettingStarted';
import ExampleOne from './examples/ExampleOne';
import Functions from './docs/Functions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      {/* Add a dynamic route to handle preloaded designs */}
      <Route path="/play/:code" element={<Play />} />
      <Route path="/about" element={<About />} />
      <Route path="/examples" element={<Examples />} />
      <Route path="/exampleOne" element={<ExampleOne />} />
      <Route path="/gettingStarted" element={<GettingStarted />} />
      <Route path="/functions" element={<Functions />} />
    </Routes>
  );
}

export default App;
