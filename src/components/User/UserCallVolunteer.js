import Calendar from "../Calendar/Calendar";
import React, {useEffect} from "react";
import {postTokenCheck} from "../services/apiServices";
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserHeadBar from "../HeadBar/UserHeaderBar";

const UserCallVolunteer = () => {
    const userInfo = useSelector(state => state.user.account);

  return (
      <>
          <div className="vol-container">
              <Calendar/>
          </div>
      </>
  );
}

export default UserCallVolunteer;
