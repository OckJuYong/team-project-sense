import './nav.css'
import { Link } from 'react-router-dom'

const Nav = () => {
    return(
        <nav>
            <div className="nav">
                <button className="home_btn">봤던 단어</button>
                <Link className="man_btn" to="/login">회원정보 수정</Link>
                <button className="write_btn">회원 레벨</button>
            </div>
        </nav>
    )
}

export default Nav