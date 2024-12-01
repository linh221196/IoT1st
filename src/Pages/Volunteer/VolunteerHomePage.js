import UserInfo from '../../components/User/UserInfo'
import Calendar from '../../components/Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import './VolunteerHome.scss';

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
