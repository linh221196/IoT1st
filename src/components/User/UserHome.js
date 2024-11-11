import { Col, Container, Row } from "react-bootstrap"
import '../Home.scss'
import Content from "../Content"
import UserInfo from "./UserInfo"
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import {postTokenCheck} from "../services/apiServices";
import {useEffect} from "react";

const UserHome = () => {
  const userInfo = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  console.log('account: ', userInfo, ' isAuthenticated: ', isAuthenticated)

  const navigate = useNavigate();

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
    <Container >
      <Row className="home-container border rounded shadow p-3 mb-5 " >
        <Col md={8} className="border-end" >
          <Content />
        </Col>
        <Col md={4} >
          <UserInfo />
        </Col>
      </Row>
    </Container>

  )
}

export default UserHome