import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const Footer = ({
    currentWord,
    setCurrentWord
}) => {
    // 이전 단어 가지고 오기
    const goToPreviousWord = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/posts/${currentWord.prev_id}/`);
        setCurrentWord(response.data);
    };

    // 다음 단어 가지고 오기
    const goToNextWord = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/posts/${currentWord.next_id}/`);
        setCurrentWord(response.data);
    };

    return (
        <footer className="footer">
            <div className="contents">
                <button className='left_btn' onClick={goToPreviousWord} disabled={!currentWord}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button className="right_btn" onClick={goToNextWord} disabled={!currentWord}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </footer>
    );
};

export default Footer;