import UserInfo from '../User/UserInfo'
import Calendar from '../Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import './VolunteerHome.scss';

const VolunteerHome = () => {
    return (
        <Container className="vol-container">
            <Row>
                <Col>
                    <Calendar/>
                </Col>
            </Row>
        </Container>

    )
}
export default VolunteerHome
