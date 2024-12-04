import UserInfo from '../../components/User/UserInfo'
import Calendar from '../../components/Calendar/Calendar'
import { Container, Row,Col } from 'react-bootstrap'
import {useState} from "react";
import './VolunteerHome.scss';

const VolunteerHome = () => {
    const [refreshVolunteerTime, setRefreshVolunteerTime] = useState(false);

    // 봉사 확정 성공 후 호출
    const triggerVolunteerTimeRefresh = () => {
        setRefreshVolunteerTime((prev) => !prev); // 상태 변경을 통해 리렌더링 유도
    };

    return (
        <Container className="custom-homecontent-container">
            <Row className="home-container border rounded shadow">
                <Col md={9} className="calendar-section">
                    <Calendar onAssignmentSuccess={triggerVolunteerTimeRefresh}/>
                </Col>
                <Col md={3} className="userinfo-section">
                    <UserInfo refresh={refreshVolunteerTime}/>
                </Col>
            </Row>
        </Container>
    );
}
export default VolunteerHome
