import Calendar from "../Calendar/Calendar";
import {postCallVolunteer} from "../services/apiServices";
import userInfo from "./UserInfo";

const UserCallVolunteer = () => {


  return (
    <div className="vol-container">
      <Calendar />
    </div>
  );
}

export default UserCallVolunteer;
