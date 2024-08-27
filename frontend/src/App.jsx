import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fetch from './functionscomp/crud';
import CreateBook from './functionscomp/createbook';
import OverduedBooks from './functionscomp/overduedbooks';
import CheckedOutBooks from './functionscomp/checkedout';
import CheckingOutBooks from './functionscomp/checkoutbooks';
import Patrons from './functionscomp/patroncrud';
import CreatePatrons from './functionscomp/createpatron';
import Navbar from './components/Navbar';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">      
        <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Fetch />} />
              <Route path="/create-book" element={<CreateBook />} />
              <Route path="/create-patron" element={<CreatePatrons />} />
              <Route path="/overdued-books" element={<OverduedBooks />} />
              <Route path="/checkedout-books" element={<CheckedOutBooks />} />
              <Route path="/checkingout-books" element={<CheckingOutBooks />} />
              <Route path="/patrons" element={<Patrons />} />
            </Routes>
          </div>
      </div>
    </Router>
  );
};

export default App;