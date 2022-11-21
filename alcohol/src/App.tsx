import React, { useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Login from './Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddInfo from './AddInfo';
import FreeBoard from './Board/FreeBoard';
import FreeWrite from './Board/FreeWrite';
import FreeRead from './Board/FreeRead';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);



  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/AddInfo" element={<AddInfo />}></Route>
        <Route path="/free" element={<FreeBoard />}></Route>
        <Route path="/free/write" element={<FreeWrite />}></Route>
        <Route path="/free/read/:id" element={<FreeRead />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
