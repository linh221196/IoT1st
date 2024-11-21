import Calendar from "../Calendar/Calendar";
import {useEffect} from "react";
import {postTokenCheck} from "../services/apiServices";
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const UserCallVolunteer = () => {
    const userInfo = useSelector(state => state.user.account);

  return (
    <div className="vol-container">
      <Calendar />
    </div>
  );
}

export default UserCallVolunteer;
