import React from "react";
import KakaoLogin from "react-kakao-login";
import './login.css'

const Login =()=>{

    const kakaoClientId = '3ef0cea92536e09d79e211b2e166c6ef'
    const redirectUri = 'http://localhost:3000/login'; // Redirect URI 설정

    const kakaoOnSuccess = async (data)=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return(
        <div className="Login_home">
            <h2>MZ 단어사전!</h2>
            <h1 className="Logo_name">SENSE</h1>
            <div className="kakao_custom_login_container">
            <KakaoLogin
                token={kakaoClientId}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
                redirectUri={redirectUri} 
                className="kakao_custom_login"
            />
            </div>
        </div>
    )
}

export default Login