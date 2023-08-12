import "./warning.css"
import { Link } from 'react-router-dom'

let count = 0;

const Warning = ({ count, increaseCount }) => {
    const warningClick = () => {
      increaseCount();
      console.log(count + 1);
      if (count + 1 >= 3) {
        alert("경고 발생!");
    }
    };

    return (
        <div className="warning_total_container">
            <h1>~~ 를 정말 신고하시겠습니까?</h1>
            <div className="warning_btn_container">
                <Link className="del_btn" to="/" onClick={warningClick}>예</Link>
                <Link className="cansle_btn" to="/">아니오</Link>
            </div>
        </div>
    )
}

export default Warning;