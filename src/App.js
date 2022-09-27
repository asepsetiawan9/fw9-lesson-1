import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import ContactUs from './pages/ContactUs';
import TabContact from './pages/TabContact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContactUs />}/>
      <Route path="/table-contact" element={<TabContact />}/>
    </Routes>
  );
}

export default App;
