import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPlus } from '@fortawesome/free-solid-svg-icons';
const Header = ({ currentWord, user }) => {
    
    return (
        <header className="header">
            <div>
                
                <div className="btn_container">
                    {user ? 
                    <Link className="mz_plus_btn" to="/mz_plus">
                        <FontAwesomeIcon icon={faPlus} size="3x" /> {/* plus 아이콘 */}
                    </Link> : 
                    <Link className="mz_plus_btn" to="/login">
                        <FontAwesomeIcon icon={faPlus} size="3x" />
                    </Link> }
                    <h1 className="logo">SENSE</h1>
                    {user ? 
                    <Link className="warning_btn" to={currentWord ? "/warning" : ""}>
                        <FontAwesomeIcon icon={faBell} size="2x" /> {/* 벨 아이콘 */}
                    </Link> :
                    <Link className="warning_btn" to="/login">
                        <FontAwesomeIcon icon={faBell} size="2x" /> {/* 벨 아이콘 */}
                    </Link> }
                </div>
            </div>
        </header>
    );
}

export default Header;