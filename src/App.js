import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import ContactUs from './pages/ContactUs';
import TabContact from './pages/TabContact';
import DetailContact from './pages/DetailContact';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactUs />}/>
      <Route path="/table-contact" element={<TabContact />}/>
      <Route path="/detail-contact" element={<DetailContact />}/>
    </Routes>
  );
}

export default App;
