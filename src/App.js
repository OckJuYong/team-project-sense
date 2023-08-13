import { useEffect } from "react";
import React, { useState } from "react";
import Layout from "./component/layout/layout";
import Login from "./component/login/login";
import Warning from "./component/warning/warning"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from "./component/write/write";


function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function App() {
  
  
  const [count, setCount] = useState(0);

  // const increaseCount = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };
  
  useEffect(() => {
    setScreenSize();
  }, []);
  

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warning" element={<Warning 
          count={count} 
          // increaseCount={increaseCount}
          />} 
        />
        <Route path="/mz_plus" element={<Write />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;