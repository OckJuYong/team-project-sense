import React, { useState, useEffect } from "react";
import axios from 'axios';
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
	const [currentWord, setCurrentWord] = useState(undefined);  // 현재 단어
	const [isLoading, setIsLoading] = useState(true);  // 로딩 중
	const [user, setUser] = useState({});  // 추가

	useEffect(() => {
		setScreenSize();

		// 사이트 처음 접속 시 단어 가지고 오기: 첫 번째 단어부터 가지고 오기
		async function fetchData() {
			try {
				// 첫 번째 단어 가져오기
				const firstPostResponse = await axios.get('http://127.0.0.1:8000/posts/first-post/');  // 수정
				setCurrentWord(firstPostResponse.data);
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
			</Routes>
		</BrowserRouter>
	)
}

export default App;