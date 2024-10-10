import { Routes, Route } from 'react-router-dom';
import React from 'react'

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className="App">
      <div className="wrapper"> 
        <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home searchValue={searchValue}/>}></Route>
              <Route path="/cart" exact element={<Cart />}></Route>
              <Route path="/*" exact element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
