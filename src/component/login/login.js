import React, { useEffect } from "react";
import './login.css'
import { Link } from 'react-router-dom';

const Login =()=>{
    const alertMsg = "로그인이 필요합니다."
    const onClick = () => {
        
    }
    useEffect(() => {
        alert(alertMsg);
    }, []);
    return(
        <div className="Login_home">
            <h2>MZ 단어사전!</h2>
            <Link to="/" className="Logo_name_Link">
                <h1 className="Logo_name" onClick={onClick}>-SENSE-</h1>
            </Link>
            <div className="kakao_custom_login_container">
            <Link className="login_link" to={process.env.REACT_APP_LOGIN_KAKAO_API}>로그인</Link>
            <div />
            <Link className="logout_link" to={process.env.REACT_APP_LOGOUT_API}>로그아웃</Link>
            </div>
        </div>
    )
}

export default Login