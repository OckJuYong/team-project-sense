
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const Footer = ({ currentWordIndex, setCurrentWordIndex, dataLength, setIsMeaningShown }) => {
    const goToPreviousWord = () => {
        setCurrentWordIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const goToNextWord = () => {
        setCurrentWordIndex(prevIndex => (prevIndex < dataLength - 1 ? prevIndex + 1 : prevIndex));
        setIsMeaningShown(false);
    };

    return (
        <footer className="footer">
            <div className="contents">
                <button className='left_btn' onClick={goToPreviousWord}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button className="right_btn" onClick={goToNextWord}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </footer>
    );
};

export default Footer;