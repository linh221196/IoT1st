import { Container, Row, Col } from "react-bootstrap"
import HeaderBar from "./HeaderBar"
import UserTable from "./UserTable"
import Chart from "./Chart"
import AddList from "./AddList"
import './Admin.scss'
import NoticeMeasure from "./NoticeMeasure";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { postLoadPatient } from "../services/apiServices";
import UserList from "../PhoneAuth";


const MedicalHome = () => {
    const userInfo = useSelector(state => state.user.account)
    const [called, setCalled] = useState(false);
    const [patientList, setPatientList] = useState([
        { username: "환자1", useremail: "이메일1", userbirth: "2001-11-01" },
        { username: "환자2", useremail: "이메일2", userbirth: "2001-11-02" }
    ]);
    const [selectedUserId, setSelectedUserId] = useState(null);


    //의료진이 처음 들어왔을 때 담당환자 list 불러오기
    const PatientCall = async () => {
        try {
            const data = await postLoadPatient(userInfo?.email);
            console.log('Check response', data);

            if (data.status === 'DataEmpty') {
                // DataEmpty일 경우 리스트를 비워줌
                setPatientList([]);
            } else if (data.status === 'success') {
                // success일 경우 받은 데이터를 list해서 넣기
                const newPatientList = data.data.map(item => ({
                    username: item.app_user?.name,
                    useremail: item.app_user?.userid,
                    userbirth: item.app_user?.birth,
                }));
                setPatientList(newPatientList);
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
    //UserTable에서 선택된 사용자id 업데이트하는 함수
    const handleUserSelect = (userId) => {
        console.log('MedicalHome에서 선택한 userId:', userId);
        setSelectedUserId(userId);
    };


    return (
        <Container className="container admin-container ms-0 ps-0 mt-0">
            {/* 헤더 */}
            <div className="HeadBar">
                <HeaderBar />
            </div>

            {/* 헤더 높이만큼 마진 추가 */}
            <div style={{ marginTop: "70px" }}>
                <div className="content-container">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <UserTable list={patientList} onSelectUser={handleUserSelect}
                                   onUpdateList={(updatedList) => setPatientList([...updatedList])}/>
                        <NoticeMeasure selectedUserId={selectedUserId} />
                        <Chart />
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default MedicalHome