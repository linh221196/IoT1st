import { Stack } from "react-bootstrap"
import '../Home.scss'
import Content from "../Content"
import UserInfo from "./UserInfo"

const UserHome = () => {

  return (
    <div className="body-container">
      <Stack direction="horizontal" >
        <div className="content-container">
          <Content />
        </div>
        <div className="loggin-container">
          <UserInfo />
        </div>
      </Stack>
    </div>
  )
}

export default UserHome