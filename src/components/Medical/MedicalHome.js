import { Container, Row, Col } from "react-bootstrap"
import SideBar from "./SideBar"
import UserTable from "./UserTable"
import AddList from "./AddList"
import './Admin.scss'
import NoticeMeasure from "./NoticeMeasure";

//여기에 처음 들어왔을 때

const MedicalHome = () => {
    return (
        <Container className="container admin-container ms-0 ps-0 mt-0">
            <div className="sidebar-container">
                <AddList />
            </div>
            <div className="content-container">
                <Row>
                    <p>Header</p>
                </Row>
                <Row>
                    <NoticeMeasure />
                </Row>
            </div>
        </Container>

    )
}
export default MedicalHome