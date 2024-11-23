import UserInfo from '../User/UserInfo'
import Calendar from '../Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import './VolunteerHome.scss';

const VolunteerHome = () => {
    return (
        <Container className="container">
            <Row className="r-container">
                <Col className="calendar-section">
                    <Calendar />
                </Col>
                <Col className="userinfo-section">
                    <UserInfo />
                </Col>
            </Row>
        </Container>
    );
}
export default VolunteerHome
