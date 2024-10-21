import { Col, Container, Row, Stack } from "react-bootstrap"
import './Home.scss'
import Content from "./Content"
import LogginView from "./LogginView"
const Home = () => {

  return (
    <Container fluid="md">
      <Row >
        <Col sm={8}>
          <Content />
        </Col>
        <Col sm={4} >
          <LogginView />
        </Col>
      </Row>
    </Container>


  )
}

export default Home