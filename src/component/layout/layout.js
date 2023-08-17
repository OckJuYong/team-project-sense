import React, { useState, useEffect } from 'react';
import axios from 'axios';  // 추가
import './main.css';
import Header from './header';
import Footer from './footer';
import Nav from './nav';

export const Layout = ({
    currentWord,
    setCurrentWord,
    isLoading,
    setUser
}) => {
    const [isMeaningShown, setIsMeaningShown] = useState(null);

    // 추가
    useEffect(() => {
        async function fetchData() {
            try {
                // 사용자 정보 가져오기 - 추가
                const userResponse = await axios.get('http://127.0.0.1:8000/members/information/', { withCredentials: true });
                setUser(userResponse.data);
            } catch (e) {}
        }
        fetchData();
    }, [setUser]);

    const toggleMeaning = () => {
        setIsMeaningShown((prevIsMeaningShown) => !prevIsMeaningShown);
    };

    const determineTextSize = () => {
        if (!currentWord) return 'medium';

        const length = currentWord.meaning.length;

        if (length < 5) {
            return 'small';
        } else if (length < 10) {
            return 'medium';
        } else {
            return 'large';
        }
    };

    const onClick = () => {
        toggleMeaning();
    };

    return (
        <div className="layout">
            <Header currentWord={currentWord}/>
            <br />
            <main>
                <div className="main">
                    <div className={`API_part ${determineTextSize()}`} onClick={onClick}>
                        {isLoading ? 'Loading...' : (
                            currentWord ? (isMeaningShown ? currentWord.meaning : currentWord.word) : 'Not Found...'
                        )}
                    </div>
                </div>
            </main>
            <br />
            <Footer
                currentWord={currentWord}
                setCurrentWord={setCurrentWord}
            />
            <br />
            <Nav />
        </div>
    );
}

export default Layout;