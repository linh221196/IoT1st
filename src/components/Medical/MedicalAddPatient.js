import {Container, Row} from "react-bootstrap";
import SideBar from "./SideBar";
import AddList from "./AddList";
import UserTable from "./UserTable";
import {useSelector} from "react-redux";
import {postLoadPatient} from "../services/apiServices";
import {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";


const MedicalAddPatient = () => {
    const userInfo = useSelector(state => state.user.account)
    const [called, setCalled] = useState(false);
    const [patientList, setpatientList] = useState([
        { username: "환자1", useremail: "이메일1", userbirth: "2001-11-01" },
        { username: "환자2", useremail: "이메일2", userbirth: "2001-11-02" }
    ]);


    //의료진이 처음 들어왔을 때 담당환자 list 불러오기
    const PatientCall = async () => {
        try {
            const data = await postLoadPatient(userInfo?.email);
            console.log('Check response', data);

            if (data.status === 'DataEmpty') {
                // DataEmpty일 경우 리스트를 비워줌
                setpatientList([]);
            } else if (data.status === 'success') {
                // success일 경우 받은 데이터를 list해서 넣기
                const newPatientList = data.data.map(item => ({
                    username: item.app_user?.name,
                    useremail: item.app_user?.userid,
                    userbirth: item.app_user?.birth,
                }));
                setpatientList(newPatientList);
            }

        } catch (error) {
            alert("서버에서 담당 환자 list를 못 받아왔습니다.");
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
            </div>
            <div className="content-container">
                <Row>
                    <Col md={3}>
                        <AddList PatientCall={PatientCall} />
                    </Col>
                    <Col md={9}>
                        <UserTable list={patientList} disableClick={true}/>
                    </Col>
                </Row>
            </div>
        </Container>

    )
}

export default MedicalAddPatient