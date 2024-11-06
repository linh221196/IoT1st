import { Container, Row, Col } from "react-bootstrap"
import SideBar from "./SideBar"
import UserTable from "./UserTable"
import AddList from "./AddList"
import './Admin.scss'
import NoticeMeasure from "./NoticeMeasure";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { postLoadPatient } from "../services/apiServices";


const MedicalHome = () => {
    const userInfo = useSelector(state => state.user.account)
    const [called, setCalled] = useState(false);
    const [patientList, setpatientList] = useState([
        { username: "이름", useremail: "이메일" }
    ]);


    //의료진이 처음 들어왔을 때 담당환자 list 불러오기
    const PatientCall = async () => {
        try {
            const data = await postLoadPatient(userInfo?.email);
            console.log('Check response', data);

            //받은 데이터를 list해서 넣기
            const newPatientList = data.map(item => ({
                username: item.app_user?.name,
                useremail: item.email
            }));

            setpatientList(newPatientList);

        } catch (error) {
            alert("서버 응답이 없습니다.");
        }
    }

    //여기에 처음 들어왔을 때
    useEffect(() => {
        if (userInfo && userInfo.role && !called) {
            if (userInfo.role === "Medical" || userInfo.role === "user") {
                PatientCall();
            }
            setCalled(true); // 첫 호출 후에 called를 true로 설정하여 이후 호출 방지
        }
    }, [userInfo.role, called]);

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
                    <UserTable list={patientList} />
                </Row>
                <Row>
                    <NoticeMeasure />
                </Row>
            </div>
        </Container>

    )
}
export default MedicalHome