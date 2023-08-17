import './write.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Write = ({ setCurrentWord }) => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [data, setData] = useState([]);

    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (word && meaning) {
            try {
                // 데이터를 백엔드에 저장
                const response = await axios.post('http://127.0.0.1:8000/posts/create/', {
                    word,
                    meaning
                });
                setCurrentWord(response.data);
            } catch (error) {
                toast.warning("이미 존재하는 단어입니다.");
            } finally {
                navigation("/");  // 단어 저장 후 단어 보는 화면(layout)으로 넘어가기(생성한 단어)
            }
        }
    };

    const handleSave = () => {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="form-group">
            <form onSubmit={handleSubmit}>
                <div className='word_form'>
                    <input
                        className="word_write_form"
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder='단어 입력창'
                    />
                    <span className="word_underline"></span>
                </div>
                <div className='mean_form'>
                    <input
                        className="mean_write_form"
                        type="text"
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        placeholder='뜻 입력창'
                    />
                    <span className="mean_underline"></span>
                </div>
                <div className="submit_btn">
                    <button className="mz_plus_write_btn" type="submit">확인</button>
                    <button className="mz_plus_cansle_btn" type="button" onClick={() => {navigation("/");}}>취소</button>
                </div>
                
            </form>
            <div className="button-group">
                <button onClick={handleSave}>데이터 저장</button>
            </div>
            
        </div>
    );
}

export default Write;