import React from 'react';
import "./warning.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Warning = ({
    currentWord,
    setCurrentWord,
    setIsLoading
}) => {
    const warningClick = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_REPORT_POST_API}${currentWord.id}`);  // 단어 신고하기
        if (response.status === 201) {
            toast.success("단어가 신고되었습니다!");
        } else if (response.status === 204) {
            toast.success("단어가 삭제되었습니다!");
            
            if (currentWord.id === currentWord.next_id) {
                // DB에 단어가 1개인 경우에 단어를 삭제한 경우: 단어 보는 화면(layout)에 'Not Found...' 표시
                setCurrentWord(undefined);
            } else {
                // DB에 단어가 2개 이상인 경우에 단어를 상제한 경우: 단어 보는 화면(layout)에 신고한 단어 다음 단어 표시
                setIsLoading(true);

                const response = await axios.get(`${process.env.REACT_APP_POST_API}${currentWord.next_id}`);
                setCurrentWord(response.data);

                setIsLoading(false);
            }
        } else if (response.status === 200) {
            toast.warning("이미 신고한 단어입니다.");
        } else if (response.status === 404) {
            toast.error("존재하지 않는 단어를 신고하였습니다.");
        } else {
            toast.error("단어 삭제 실패");
        }
    };

    return (
        <div className="warning_total_container">
            <h1>~~ 를 정말 신고하시겠습니까?</h1>
            <div className="warning_btn_container">
                <Link className="del_btn" to="/" onClick={warningClick}>예</Link>
                <Link className="cancel_btn" to="/">아니오</Link>
            </div>
        </div>
    );
};

export default Warning;