import React, { useState, useEffect } from 'react';
import "./warning.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Warning = () => {
    const [count, setCount] = useState(0);

    const warningClick = async () => {
        setCount(prevInt => prevInt + 1)
        const updatedCount = count;
        console.log(count)


        if (updatedCount >= 3) {

            try {
                const response = await axios.delete(`http://127.0.0.1:8000/posts/report/${global.warning_word}`);
                if (response.status === 204) {
                    toast.success("단어가 삭제되었습니다!");
                } else if (response.status === 200) {
                    toast.warning("이미 신고한 단어입니다.");
                } else if (response.status === 404) {
                    toast.error("존재하지 않는 단어를 신고하였습니다.");
                } else {
                    toast.error("단어 삭제 실패");
                }
                
            } catch (error) {
                console.error('Error reporting word:', error);
            }
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