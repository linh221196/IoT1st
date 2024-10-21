import { Col, Container, Row } from "react-bootstrap"
import '../Home.scss'
import Content from "../Content"
import UserInfo from "./UserInfo"

const UserHome = () => {

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