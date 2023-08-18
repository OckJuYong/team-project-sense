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
        const response = await axios.get(`${process.env.REACT_APP_POST_API}${currentWord.prev_id}/`);
        setCurrentWord(response.data);
    };

    // 다음 단어 가지고 오기
    const goToNextWord = async () => {
        const response = await axios.get(`${process.env.REACT_APP_POST_API}${currentWord.next_id}/`);
        setCurrentWord(response.data);
    };

    return (
        <footer className="footer">
            <div className="contents_lerebtn">
                <button className='left_btn' onClick={goToPreviousWord} disabled={!currentWord}><FontAwesomeIcon icon={faArrowLeft} size="4x"/></button>
                <button className="right_btn" onClick={goToNextWord} disabled={!currentWord}><FontAwesomeIcon icon={faArrowRight} size="4x"/></button>
            </div>
        </footer>
    );
};

export default Footer;