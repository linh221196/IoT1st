import Calendar from "../Calendar/Calendar";
import {useEffect} from "react";
import {postTokenCheck} from "../services/apiServices";
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const UserCallVolunteer = () => {
    const userInfo = useSelector(state => state.user.account);
    const navigate = useNavigate();

    //토큰 체크
    const TokenCheck = async () => {
        try {
            const data = await postTokenCheck(userInfo.email, userInfo.refreshToken)

            if (data.status === "TokenInvalid") {
                alert("유효하지 않은 토큰");
                navigate('/');
            } else {
                console.log('토큰사용자 인증완료')
            }
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }

    useEffect(() => {
            TokenCheck();
    }, []);

  return (
    <div className="vol-container">
      <Calendar />
    </div>
  );
}

export default UserCallVolunteer;
