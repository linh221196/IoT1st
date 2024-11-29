import UserInfo from '../User/UserInfo'
import Calendar from '../Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import './VolunteerHome.scss';
import Content from "../Content";

const VolunteerHome = () => {
    return (
        <Container className="custom-homecontent-container">
            <Row className="home-container border rounded shadow">
                <Col md={9} className="calendar-section">
                    <Calendar/>
                </Col>
                <Col md={3} className="userinfo-section">
                    <UserInfo />
                </Col>
            </Row>
        </Container>
    );
}
export default VolunteerHome
