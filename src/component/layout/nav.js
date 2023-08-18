import './nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBookmark } from '@fortawesome/free-regular-svg-icons';

const Nav = () => {
    return(
        <nav>
            <div className="nav">
                <Link className="home_btn" to="/bookmark">
                    <FontAwesomeIcon icon={faBookmark} size="2x"/>
                </Link>
                <Link className="man_btn" to="/login">
                    <FontAwesomeIcon icon={faAddressCard} size="2x"/> {/* 올바른 아이콘 식별자 사용 */}
                </Link>
            </div>
        </nav>
    )
}

export default Nav