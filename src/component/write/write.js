import './write.css';
import React, { useState } from 'react';
import axios from 'axios';

const Write = () => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (word && meaning) {
            try {
                // 데이터를 백엔드에 저장
                const response = await axios.post('http://192.168.0.15:8000/posts/create/', {
                    word,
                    meaning
                });
                // 저장 후 초기화
                setData((prevData) => [...prevData, response.data]);
                setWord('');
                setMeaning('');
            } catch (error) {
                console.error('Error saving data:', error);
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
                    <button className="mz_plus_cansle_btn" type="button" onClick={() => { setWord(''); setMeaning(''); }}>취소</button>
                </div>
                
            </form>
            <div className="button-group">
                <button onClick={handleSave}>데이터 저장</button>
            </div>
            
        </div>
    );
}

export default Write;