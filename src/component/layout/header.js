import { Link } from 'react-router-dom'
import './header.css'

const Header = ({ currentWord }) => {
    return (
        <header className="header">
            <div>
                <div className="btn_container">
                    <Link className="mz_plus_btn" to="/mz_plus">MZ 추가하기</Link>
                    <h1 className="logo">SENSE</h1>
                    <Link className="warning_btn" to={currentWord ? "/warning" : ""}>신고하기</Link>
                </div>

            </div>        
        </header>
        
    )
}

export default Header