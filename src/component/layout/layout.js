import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';
import Header from './header';
import Footer from './footer';
import Nav from './nav';

const Layout = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [isMeaningShown, setIsMeaningShown] = useState(false);
    const [wordData, setWordData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/posts/${currentWordIndex}/`);
            console.log(response);
            setWordData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (currentWordIndex !== null) {
            fetchData();
        }
    }, [currentWordIndex]);

    const toggleMeaning = () => {
        setIsMeaningShown((prevIsMeaningShown) => !prevIsMeaningShown);
    };

    const determineTextSize = () => {
        if (!wordData) return 'medium';

        const length = wordData.meaning.length;

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
            <Header />
            <br />
            <main>
                <div className="main">
                    <div className={`API_part ${determineTextSize()}`} onClick={onClick}>
                        {isLoading ? 'Loading...' : (isMeaningShown ? wordData.meaning : wordData.word)}
                    </div>
                </div>
            </main>
            <br />
            <Footer
                currentWordIndex={currentWordIndex}
                setCurrentWordIndex={setCurrentWordIndex}
                dataLength={3} // 예시로 임의의 값 설정
                setIsMeaningShown={setIsMeaningShown}
            />
            <br />
            <Nav />
        </div>
    );
}

export default Layout;
