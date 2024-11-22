import { Col, Container, Row, Stack } from "react-bootstrap"
import './Home.scss'
import Content from "./Content"
import LogginView from "./LogginView"
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import userInfo from "./User/UserInfo";

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.user.account)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    console.log("redux 상태", userInfo.role);
    if (isAuthenticated) {
      if (userInfo.role === "Patient" || userInfo.role === "user") {
        navigate('/UserHome');
      } else if (userInfo.role === "ADMIN" || userInfo.role === "Medical") {
        navigate('/MedicalHome');
      } else {
        navigate('/VolunteerHome');
      }
    }
  }, [navigate, userInfo.role, isAuthenticated]);


  return (
    <Container className="homecontent-container" >
      <Row className="home-container border rounded shadow p-3 mb-5 " >
        <Col md={8} className="border-end" >
          <Content />
        </Col>
        <Col md={4} className="login-container">
          <LogginView />
        </Col>
      </Row>
    </Container>
  )
}

export default Home