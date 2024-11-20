import { Col, Container, Row } from "react-bootstrap"
import '../Home.scss'
import Content from "../Content"
import UserInfo from "./UserInfo"
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import {postTokenCheck} from "../services/apiServices";
import {useEffect} from "react";
import Test from "../services/test";

const UserHome = () => {
  const userInfo = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  console.log('account: ', userInfo, ' isAuthenticated: ', isAuthenticated)



  return (
    <Container className="homecontent-container">
      <Row className="home-container border rounded shadow p-3 mb-5 " >
        <Col md={8} className="border-end" >
          <Content />
        </Col>
        <Col md={4} className="userinfo-container">
          <UserInfo />
        </Col>
      </Row>
    </Container>

  )
}

export default UserHome