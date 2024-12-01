import { Col, Container, Row } from "react-bootstrap"
import '../Home.scss'
import Content from "../../components/Content"
import UserInfo from "../../components/User/UserInfo"

const UserHome = () => {

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