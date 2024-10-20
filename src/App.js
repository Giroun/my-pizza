import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" exact element={<Home />}></Route>
              <Route path="cart" exact element={<Cart />}></Route>
              <Route path="pizza/:id" exact element={<FullPizza />}></Route>
              <Route path="*" exact element={<NotFound />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
