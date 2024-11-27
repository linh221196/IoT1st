import HeaderBar from "./HeaderBar";
import UserTable from "./UserTable";
import {Container, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postLoadPatient, postMedicalChart} from "../services/apiServices";
import Chart from "./Chart";
import ChartList from "./ChartList";

const MedicalChart = () => {
    const userInfo = useSelector(state => state.user.account)
    const [called, setCalled] = useState(false);
    const [patientList, setPatientList] = useState([
        { username: "환자1", useremail: "이메일1", userbirth: "2001-11-01" },
        { username: "환자2", useremail: "이메일2", userbirth: "2001-11-02" }
    ]);
    const [ecgList, setEcgList] = useState([
        /*9058.98, 9025.72, 9052.14, 8988.03, 8965.34, 9068.58, 9055.19, 9056.22, 9017.17,
        9050.69, 9003.65, 9050.51, 9061.09, 9024.71, 9005.23, 9096.98, 9029.07, 9011.47,
        9055.09, 9058.27, 8988.45, 9051.42, 9021.05, 9026.76, 8996.57, 8974.98, 9034.58,
        9000.46, 9011.68, 9040.22, 8995.15, 9008.81, 9057.78, 9046.25, 8976.25, 8994.58,
        9011.04, 9059.13, 8984.89, 9055.23, 9033.98, 9007.89, 9044.15,*/
        ])


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

    //삭제 등 업데이트가 되었을때
    const handleUpdateList = (updatedList) => {
        setPatientList([...updatedList]);
    };

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
        loadChart(userId);
    };

    //환자의 측정값 받아오기
    const loadChart = async (userId) => {
        try {
            const data = await postMedicalChart(userId);
            console.log('측정값 양식', data);

            // 서버에서 받은 데이터가 EcgAverageValues 형태인지 확인
            if (data?.EcgAverageValues && Array.isArray(data.EcgAverageValues)) {
                setEcgList(data.EcgAverageValues); // ecgList 상태 업데이트
            }

        } catch (error) {
            alert("서버에서 담당 환자 list를 못 받아왔습니다.");
        }
    }

    return(
        <>
            {/* 헤더 */}
            <div className="HeadBar">
                <HeaderBar />
            </div>
            <Container style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0',
                boxSizing: 'border-box',
            }}
                       className="container admin-container">
                {/* 헤더 높이만큼 마진 추가 */}
                <div className="custom-admin-container">
                    <div className="content-container" style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                        <div className="user-table-container" style={{flex: 1}}>
                            <UserTable
                                list={patientList}
                                onSelectUser={handleUserSelect}
                                onUpdateList={handleUpdateList}
                            />
                        </div>
                        {/* Chart Container */}
                        <div className="chart-container" style={{flex: 2}}>
                            <Row style={{ display: "flex", flexWrap: "nowrap" }}> {/* Flexbox 강제 가로 배치 */}
                                <Col style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <ChartList />
                                    <Chart list={ecgList}/>
                                    <Chart />
                                </Col>
                                <Col style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <Chart />
                                    <Chart />
                                    <Chart />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default MedicalChart;