import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from "./component/layout/layout";
import Login from "./component/login/login";
import Warning from "./component/warning/warning"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from "./component/write/write";
// import Bookmark from "./component/bookmark/bookmark";


function setScreenSize() {
   let vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function App() {
   const [currentWord, setCurrentWord] = useState(undefined);  // 현재 단어
   const [currentMarkedWord, setCurrentMarkedWord] = useState(undefined);  // 현재 저장한 단어
   const [isLoading, setIsLoading] = useState(true);  // 로딩 중
   const [user, setUser] = useState('');  // 추가

   useEffect(() => {
      setScreenSize();

      // 사이트 처음 접속 시 단어 가지고 오기: 첫 번째 단어부터 가지고 오기
      async function fetchData() {
         try {
            // 첫 번째 단어 가져오기
            const firstCurrentWordResponse = await axios.get(process.env.REACT_APP_FIRST_POST_API);  // 수정
            setCurrentWord(firstCurrentWordResponse.data);

            // 첫 번째 저장한 단어 가져오기
            const firstCurrentMarkedWordResponse = await axios.get(process.env.REACT_APP_FIRST_MARKED_POST_API);
            setCurrentMarkedWord(firstCurrentMarkedWordResponse.data);
         } catch (e) {} finally {
            setIsLoading(false);
         }
        }
        fetchData();

   }, []);

   return (
      <BrowserRouter>
         <Routes>
         <Route
            path="/"
            element={
               <Layout
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  currentMarkedWord={currentMarkedWord}
                  setCurrentMarkedWord={setCurrentMarkedWord}
                  isLoading={isLoading}
                  setUser={setUser}
               />
            }
         />
         <Route path="/login" element={<Login />} />
         <Route
            path="/warning"
            element={
               <Warning
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  setIsLoading={setIsLoading}
               />
            } 
         />
         <Route path="/mz_plus" element={<Write setCurrentWord={setCurrentWord}/>} />
         {/* <Route path="/bookmark" element={<Bookmark />}></Route> */}
         <Route
            path='/boomark'
            element={
               <Layout
                  currentWord={currentMarkedWord}
                  setCurrentWord={setCurrentMarkedWord}
                  currentMarkedWord={currentMarkedWord}
                  setCurrentMarkedWord={setCurrentMarkedWord}
                  isLoading={isLoading}
                  setUser={setUser}
               />
            }
         />
         </Routes>
      </BrowserRouter>
   )
}

export default App;