import './nav.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Nav = ({
    currentWord,
    currentMarkedWord,
    setCurrentMarkedWord,
    setIsLoading,
    user
}) => {
    const onMarkClick = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MARK_POST_API}${currentMarkedWord.id}/`, {withCredentials: true});

            if (response.status === 201) {
                console.log('단어를 성공적으로 저장했습니다!');

                // 단어 처음 저장한 경우: currentMarkedWord = { ... }
                if (Object.keys(currentWord).length === 0) {
                    setIsLoading(true);

                    try {
                        const response = await axios.get(process.env.REACT_APP_FIRST_MARKED_POST_API, { withCredentials: true });
                        setCurrentMarkedWord(response.data);
                    } catch (e) {} finally {
                        setIsLoading(false);
                    }
                }
            } else if (response.status === 204) {
                console.log('단어를 성공적으로 저장 취소했습니다.');

                if (currentMarkedWord.mark_id === currentMarkedWord.next_id) {
                    setCurrentMarkedWord(undefined);
                } else {
                    setIsLoading(true);

                    try {
                        const response = await axios.get(`${process.env.REACT_APP_MARKED_POST_API}${currentMarkedWord.next_id}/`);
                        setCurrentMarkedWord(response.data);
                    } catch (e) {} finally {
                        setIsLoading(false);
                    }
                }
            }
        } catch (e) {
            if (e.response.status === 403) {
                console.log('인즈오디지 않은 사용자입니다.');
            } else if (e.response.status === 404) {
                console.log('존재하지 않는 단어를 저장 시도했습니다.');
            }
        }
    };

    return(
        <nav>
            <div className="nav">
                <Link className="home_btn" to="/bookmark">
                    <FontAwesomeIcon icon={faBookmark} size="2x"/>
                </Link>
                <button className="home_save_btn" onClick={onMarkClick}>
                    <FontAwesomeIcon icon={faList} size="2x"/>
                </button>
                <Link className="man_btn" to="/login">
                    {user !== '' ? <div className="userName">{user}</div> : 
                    <FontAwesomeIcon icon={faAddressCard} size="2x"/> 
                    }
                </Link>
            </div>
        </nav>
    )
}



export default Nav