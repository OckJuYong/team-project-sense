import React from "react";
import './login.css'
import { Link } from 'react-router-dom';

const Login =()=>{

    const kakaoClientId = '3ef0cea92536e09d79e211b2e166c6ef'
    const redirectUri = 'http://localhost:3000/login'; // Redirect URI 설정
    const sungsu_address = 'http://192.168.0.4:8000/accounts/kakao/login/'; // 백엔드 주소


    /* Link의 주소는 성수의 IP 주소이기때문에 바뀔 수 있다는 사실을 인지하십시오 사용자 */
    return(
        <div className="Login_home">
            <h2>MZ 단어사전!</h2>
            <h1 className="Logo_name">SENSE</h1>
            <div className="kakao_custom_login_container">
            <Link to='http://192.168.0.4:8000/accounts/kakao/login/'>로그인</Link>
            </div>
        </div>
    )
}

export default Login