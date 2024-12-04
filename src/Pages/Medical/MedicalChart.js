import HeaderBar from "../../components/HeadBar/HeaderBar";
import UserTable from "../../components/Medical/UserTable";
import {Container, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postLoadPatient, postMedicalChart} from "../../services/apiServices";
import Chart from "../../components/Medical/Chart";
import ChartList from "../../components/Medical/ChartList";

const MedicalChart = () => {
    const userInfo = useSelector(state => state.user.account)
    const [called, setCalled] = useState(false);
    const [patientList, setPatientList] = useState([
/*        { username: "정규혁", useremail: "l7562l@naver.com", userbirth: "2001-05-03" },
        { username: "환자2", useremail: "이메일2", userbirth: "2001-11-02" }*/
    ]);
    const [ecgData, setEcgData] = useState({
        name: "ECG",
        "values": [
/*            29621.2, 29621.7, 29622, 29620.9, 29620.8, 29620.9, 29620.6, 29620.8, 29620.4, 29620.7,
            29621.1, 29621.2, 29620.9, 29621.1, 29620.9, 29620.4, 29620.1, 29620.4, 29620.6, 29620.3,
            29620.2, 29620.1, 29620, 29620.5, 29620.1, 29620.5, 29620.6, 29620.4, 29620.3, 29620.2,
            29620.4, 29620.1, 29620.4, 29620, 29619.9, 29620, 29620.4, 29620.5, 29619.7, 29620.5,
            29620.3, 29620.1, 29620, 29620.3, 29620, 29620.1, 29620.1, 29619.8, 29620.2, 29620.5,
            29620.8, 29620.6, 29621, 29620.6, 29620.9, 29620.7, 29620.8, 29620.9, 29620.7, 29620.5*/
        ],
    });
    const [eogData, setEogData] = useState({
        name: "EOG",
        values: [
/*            13919.22, 13889.29, 13813.82, 13871.65, 13950.93, 13933.47, 13907.86, 13969.02,
            13846.78, 13935.51, 13900.24, 13830.29, 13839.97, 13996.14, 13935.44, 13851.81,
            13956.62, 13893.3, 13949.8, 13898.69, 13966.91, 13929.65, 13902.34, 13944.69,
            13948.53, 13842.64, 13955.58, 13819.01, 13858.79, 13833.84, 13980.18, 13855.8,
            13902.87, 13861.36, 13907.22, 13881.91, 13905.03, 13867.43, 13801.34, 13970.93,
            13914.1, 13906.07, 13948.87, 13841.45, 13993.94, 13947.12, 13872.52, 13989.08,
            13939.87, 13962.6, 13828.82, 13903.47, 13870.36, 13938.9, 13862.94, 13815.38,
            13912.13, 13979.65, 13922.39, 13828.09*/
        ],
    });
    const [emgData, setEmgData] = useState({
        name: "EMG",
        values: [
/*            9960.91, 9922.75, 9979.3, 9950.57, 9914.79, 9976.91, 9946.85, 9998.39, 9943.38,
            9933.43, 9950.4, 9972.1, 9980.37, 9964.53, 9938.77, 9917.86, 9964.26, 9952.31,
            9917.7, 9919.88, 9944.94, 9937.68, 9909.87, 9996.96, 9975.28, 9985.1, 9928.47,
            9985.4, 9973.9, 9928.76, 9977.81, 9942.86, 9987.99, 9941.96, 9941.33, 9943.44,
            9928.6, 9961.84, 9991.05, 9915.15, 9944.0, 9998.7, 9989.18, 9983.01, 9911.2,
            9920.46, 9946.71, 9987.03, 9963.25, 9956.55, 9927.56, 9907.05, 9952.98, 9984.52,
            9981.82, 9921.09, 9944.04, 9981.62, 9998.85, 9960.36*/
        ],
    });
    const [airflowData, setAirflowData] = useState({
        name: "AirFlow",
        values: [
/*            13534.21, 13555.61, 13517.17, 13538.03, 13554.52, 13532.23, 13577.89, 13506.43,
            13595.48, 13564.02, 13538.45, 13597.32, 13577.13, 13558.69, 13529.34, 13544.49,
            13547.87, 13587.83, 13544.43, 13542.93, 13583.54, 13535.88, 13541.76, 13550.87,
            13525.72, 13506.7, 13501.55, 13557.47, 13572.83, 13551.52, 13570.6, 13511.36,
            13569.89, 13578.21, 13599.78, 13501.59, 13539.45, 13534.62, 13506.14, 13559.58,
            13570.26, 13529.09, 13565.94, 13562.1, 13518.97, 13570.96, 13513.05, 13589.0,
            13516.52, 13520.84, 13509.79, 13593.91, 13535.0, 13515.52, 13583.65, 13593.57,
            13504.42, 13518.52, 13513.56, 13569.83*/
        ],
    });
    const [gsrData, setGsrData] = useState({
        name: "GSR",
        values: [
/*            14068.49, 14069.66, 14061.63, 14059.05, 14047.21, 14022.95, 14006.8, 14052.22,
            14084.54, 14041.4, 14060.64, 14050.4, 14029.78, 14049.69, 14092.01, 14015.17,
            14081.09, 14028.17, 14004.59, 14023.82, 14023.6, 14025.77, 14004.97, 14005.69,
            14051.8, 14093.52, 14082.28, 14057.77, 14079.48, 14023.97, 14086.63, 14073.35,
            14050.87, 14072.29, 14053.96, 14051.91, 14019.21, 14017.53, 14087.95, 14074.32,
            14029.46, 14000.28, 14044.0, 14055.9, 14078.39, 14099.26, 14023.11, 14068.35,
            14078.43, 14016.59, 14038.86, 14022.26, 14074.77, 14061.27, 14098.91, 14019.16,
            14016.12, 14027.6, 14020.61, 14004.79*/
        ],
    });
    const [chartData, setChartData] = useState([
        {name: 'Spo2', value:""},
        { name: 'NIBP', value: { systolic: "", diastolic: "" } },
        {name: 'BodyTemp', value:""},
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
            console.log('받아온 데이터:', data); // 전체 데이터 출력

            // EcgAverageValues 데이터 처리
            if (data?.EcgAverageValues && Array.isArray(data.EcgAverageValues)) {
                const ecgFormatted = {
                    name: "ECG",
                    values: data.EcgAverageValues,
                };
                setEcgData(ecgFormatted);
                console.log('ECG 데이터:', ecgFormatted); // ECG 데이터 출력
            }

            // EmgAverageValues 데이터 처리
            if (data?.EmgAverageValues && Array.isArray(data.EmgAverageValues)) {
                const emgFormatted = {
                    name: "EMG",
                    values: data.EmgAverageValues,
                };
                setEmgData(emgFormatted);
                console.log('EMG 데이터:', emgFormatted); // EMG 데이터 출력
            }

            // AirFlowAverageValues 데이터 처리
            if (data?.AirflowAverageValues && Array.isArray(data.AirflowAverageValues)) {
                const airflowFormatted = {
                    name: "AirFlow",
                    values: data.AirflowAverageValues,
                };
                setAirflowData(airflowFormatted);
                console.log('AirFlow 데이터:', airflowFormatted); // AirFlow 데이터 출력
            }

            // EogAverageValues 데이터 처리
            if (data?.EogAverageValues && Array.isArray(data.EogAverageValues)) {
                const eogFormatted = {
                    name: "Eog",
                    values: data.EogAverageValues,
                };
                setEogData(eogFormatted);
                console.log('eog 데이터:', eogFormatted); // AirFlow 데이터 출력
            }

            // GsrAverageValues 데이터 처리
            if (data?.GsrAverageValues && Array.isArray(data.GsrAverageValues)) {
                const gsrFormatted = {
                    name: "GSR",
                    values: data.GsrAverageValues,
                };
                setGsrData(gsrFormatted);
                console.log('GSR 데이터:', gsrFormatted); // GSR 데이터 출력
            }

            // Spo2DataList 데이터 처리
            if (data?.spo2DataList && Array.isArray(data.spo2DataList)) {
                const spo2Value = data.spo2DataList[0] || "N/A"; // 데이터 배열의 첫 번째 값을 가져옴
                setChartData((prev) =>
                    prev.map((item) =>
                        item.name === "Spo2" ? { ...item, value: `${spo2Value}%` } : item
                    )
                );
                console.log('Spo2 데이터:', { name: "Spo2", value: `${spo2Value}%` }); // Spo2 데이터 출력
            }

            // NibpDataList 데이터 처리
            if (data?.nibpDataList && Array.isArray(data.nibpDataList)) {
                const nibpData = data.nibpDataList[0] || { systolic: "N/A", diastolic: "N/A" };
                const nibpFormatted = {
                    name: "NIBP",
                    value: {
                        systolic: `${nibpData.systolic || "N/A"}mmHg`,
                        diastolic: `${nibpData.diastolic || "N/A"}mmHg`,
                    },
                };
                setChartData((prev) =>
                    prev.map((item) =>
                        item.name === "NIBP" ? nibpFormatted : item
                    )
                );
                console.log('NIBP 데이터:', nibpFormatted); // NIBP 데이터 출력
            }

            // TempData 데이터 처리
            if (data?.tempdata && Array.isArray(data.tempdata)) {
                const bodyTemp = data.tempdata[0] || "N/A"; // 데이터 배열의 첫 번째 값을 가져옴
                setChartData((prev) =>
                    prev.map((item) =>
                        item.name === "BodyTemp" ? { ...item, value: `${bodyTemp}°C` } : item
                    )
                );
                console.log('BodyTemp 데이터:', { name: "BodyTemp", value: `${bodyTemp}°C` }); // BodyTemp 데이터 출력
            }

            console.log("chartData :", chartData);
        } catch (error) {
            console.error("서버에서 데이터를 받아오는 중 에러가 발생했습니다.", error);
        }
    };


    return(
        <>
            <Container style={{
                maxWidth: '1500px',
                margin: '0 auto',
                padding: '0',
                boxSizing: 'border-box',
            }}
                       className="container admin-container">
                {/* 헤더 높이만큼 마진 추가 */}
                <div className="chart-admin-container">
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
                                    <ChartList data={chartData}/>
                                    <Chart data={ecgData}/>
                                    <Chart data={eogData}/>
                                </Col>
                                <Col style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <Chart data={emgData}/>
                                    <Chart data={airflowData}/>
                                    <Chart data={gsrData}/>
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