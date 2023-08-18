import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // 레귤러 스타일 아이콘을 사용하려면 해당 패키지에서 불러옵니다.
import './write.css';

const Write = ({ setCurrentWord }) => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');

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
                    <button className="mz_plus_write_btn" type="submit">
                        <FontAwesomeIcon icon={faCheck} /> {/* 올바른 아이콘 식별자 사용 */}
                    </button>
                    <button className="mz_plus_cansle_btn" type="button" onClick={() => {navigation("/");}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                
            </form>
            
        </div>
    );
}

export default Write;