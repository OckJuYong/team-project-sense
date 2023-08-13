import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';
import Header from './header';
import Footer from './footer';
import Nav from './nav';

export const Layout = () => {
    const initialCount = parseInt(localStorage.getItem('warning_word')) || 1; // initialCount를 여기서 정의

    const [currentWordIndex, setCurrentWordIndex] = useState(initialCount);
    const [isMeaningShown, setIsMeaningShown] = useState(false);
    const [wordData, setWordData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedWarningWord = localStorage.getItem('warning_word');
        if (storedWarningWord !== null) {
            global.warning_word = storedWarningWord;
            setCurrentWordIndex(parseInt(storedWarningWord));
        }
    }, []);

    useEffect(() => {
        if (currentWordIndex !== null) {
            fetchData();
        }
    }, [currentWordIndex]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.0.4:8000/posts/${currentWordIndex}/`);
            setWordData(response.data);
            
            setIsLoading(false);

            localStorage.setItem('warning_word', currentWordIndex);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleMeaning = () => {
        setIsMeaningShown((prevIsMeaningShown) => !prevIsMeaningShown);
    };

    const determineTextSize = () => {
        if (!wordData) return 'medium';

        const length = wordData.meaning.length;

        if (length < 5) {
            return 'small';
        } else if (length < 10) {
            return 'medium';
        } else {
            return 'large';
        }
    };

    const onClick = () => {
        toggleMeaning();
    };

    return (
        <div className="layout">
            <Header />
            <br />
            <main>
                <div className="main">
                    <div className={`API_part ${determineTextSize()}`} onClick={onClick}>
                        {isLoading ? 'Loading...' : (isMeaningShown ? wordData.meaning : wordData.word)}
                    </div>
                </div>
            </main>
            <br />
            <Footer
                currentWordIndex={currentWordIndex}
                setCurrentWordIndex={setCurrentWordIndex}
                setIsMeaningShown={setIsMeaningShown}
            />
            <br />
            <Nav />
        </div>
    );
}

export default Layout;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './main.css';
// import Header from './header';
// import Footer from './footer';
// import Nav from './nav';

// // export const fetchData = async (currentWordIndex) => {
// //     try {
// //         const response = await axios.get(`http://127.0.0.1:8000/posts/${currentWordIndex}/`);
// //         console.log(response);
// //         const warning_word = currentWordIndex;
// //         return (
// //             response.data, 
// //             warning_word
// //             );
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         throw error;
// //     }
// // };

// export const Layout = () => {
//     const [currentWordIndex, setCurrentWordIndex] = useState(1);
//     const [isMeaningShown, setIsMeaningShown] = useState(false);
//     const [wordData, setWordData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     /* -------------------------------------------- */

//     // const initialCount = parseInt(localStorage.getItem(global.warning_word)) || 1;

//     // // useState를 이용해 count 상태 관리
//     // const [count, setCount] = useState(initialCount);
  
//     // // count 값이 변경될 때마다 로컬 스토리지에 저장
//     // useEffect(() => {
//     //   localStorage.setItem(initialCount, count.toString());
//     // }, [count]);

//     /* -------------------------------------------- */


//     /*단어 하나씩 가져오는 데이터 */

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/posts/${currentWordIndex}/`);
//             setWordData(response.data);
//             setIsLoading(false);
//             global.warning_word = currentWordIndex;
//             console.log(global.warning_word);

//             return (
//                 response.data
//             );
            
            
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         if (currentWordIndex !== null) {
//             fetchData();
//         }
//     }, [currentWordIndex]);

//     const toggleMeaning = () => {
//         setIsMeaningShown((prevIsMeaningShown) => !prevIsMeaningShown);
//     };

//     const determineTextSize = () => {
//         if (!wordData) return 'medium';

//         const length = wordData.meaning.length;

//         if (length < 5) {
//             return 'small';
//         } else if (length < 10) {
//             return 'medium';
//         } else {
//             return 'large';
//         }
//     };

//     const onClick = () => {
//         toggleMeaning();
//     };

//     return (
//         <div className="layout">
//             <Header />
//             <br />
//             <main>
//                 <div className="main">
//                     <div className={`API_part ${determineTextSize()}`} onClick={onClick}>
//                         {isLoading ? 'Loading...' : (isMeaningShown ? wordData.meaning : wordData.word)}
//                     </div>
//                 </div>
//             </main>
//             <br />
//             <Footer
//                 currentWordIndex={currentWordIndex}
//                 setCurrentWordIndex={setCurrentWordIndex}
//                 setIsMeaningShown={setIsMeaningShown}
//             />
//             <br />
//             <Nav />
//         </div>
//     );
// }

// export default Layout;


