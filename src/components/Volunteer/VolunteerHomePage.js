import UserInfo from '../User/UserInfo'
import Calendar from '../Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import './VolunteerHome.scss';

const VolunteerHome = () => {
    return (
        <Container className="homecontent-container">
            <Row className="home-container border rounded shadow p-3 mb-5 " >
                <Col md={8}>
                    <Calendar />
                </Col>
                <Col md={4} className="userinfo-container">
                    <UserInfo />
                </Col>
            </Row>
        </Container>
    );
}
export default VolunteerHome
