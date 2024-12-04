import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {postMeasurePatient, postModifyMeasure} from "../../services/apiServices";
import { MdCheckBox } from "react-icons/md"; //체크 표시
import { MdCheckBoxOutlineBlank } from "react-icons/md"; //빈표시

const NoticeMeasure = ({ selectedUserId }) => {
    const userInfo = useSelector(state => state.user.account);
    const [listUser, setListUser] = useState([
/*        { measurement: 'spo2', userid: 'l7562l@naver.com', status: false },
        { measurement: 'airflow', userid: 'l7562l@naver.com', status: false },
        { measurement: 'bodytemp', userid: 'l7562l@naver.com', status: false },
        { measurement: 'ecg', userid: 'l7562l@naver.com', status: false},
        { measurement: 'emg', userid: 'l7562l@naver.com', status: false},
        { measurement: 'gsr', userid: 'l7562l@naver.com', status: false },
        { measurement: 'nibp', userid: 'l7562l@naver.com', status: false },
        { measurement: 'eog', userid: 'l7562l@naver.com', status: false },*/
    ]);

    //부모 컨포넌트에서 selectedUserId의 변경이 확인 될때마다 그 ID에 맞는 list값 받아오기
    const LoadList = async () => {
        try {
            console.log('Selected User ID: ', selectedUserId);
            const data = await postMeasurePatient(selectedUserId);
            console.log('Check response', data);

            const newList = [
                { measurement: 'spo2', userid: selectedUserId, status: data.spo2 === "true" },
                { measurement: 'airflow', userid: selectedUserId, status: data.airflow === "true" },
                { measurement: 'bodytemp', userid: selectedUserId, status: data.bodytemp === "true" },
                { measurement: 'ecg', userid: selectedUserId, status: data.ecg === "true" },
                { measurement: 'emg', userid: selectedUserId, status: data.emg === "true" },
                { measurement: 'gsr', userid: selectedUserId, status: data.gsr === "true" },
                { measurement: 'nibp', userid: selectedUserId, status: data.nibp === "true" },
                { measurement: 'eog', userid: selectedUserId, status: data.eog === "true" },
            ];

            setListUser(newList);
        } catch (error) {
            alert("서버에서 필수 측정 요소를 못 받아왔습니다.");
        }
    };
    //저장 버튼을 눌러 백엔드로 list값 보내기
    const handleModifyMeasure = async () => {
        console.log(listUser)
        try {
            //list에서 필요 데이터 추출
            const dataToSend = {
                userid: selectedUserId,
                spo2: String(listUser.find(item => item.measurement === 'spo2')?.status || false),
                airflow: String(listUser.find(item => item.measurement === 'airflow')?.status || false),
                bodytemp: String(listUser.find(item => item.measurement === 'bodytemp')?.status || false),
                ecg: String(listUser.find(item => item.measurement === 'ecg')?.status || false),
                emg: String(listUser.find(item => item.measurement === 'emg')?.status || false),
                gsr: String(listUser.find(item => item.measurement === 'gsr')?.status || false),
                nibp: String(listUser.find(item => item.measurement === 'nibp')?.status || false),
                eog: String(listUser.find(item => item.measurement === 'eog')?.status || false),
            };
            console.log(dataToSend)

            postModifyMeasure(
                dataToSend.userid,
                dataToSend.spo2,
                dataToSend.airflow,
                dataToSend.bodytemp,
                dataToSend.ecg,
                dataToSend.emg,
                dataToSend.gsr,
                dataToSend.nibp,
                dataToSend.eog,
            )

            alert("필수 측정 요소 저장되었습니다.");

        } catch (error) {
            alert("서버 응답이 없습니다.");
        }

    }

    useEffect(() => {
        if (userInfo && userInfo.role && selectedUserId) {
            LoadList();
        } else {
            //setListUser(null);
        }
    }, [userInfo.role, selectedUserId]);

    //주의할 요소의 변경값을 즉시 저장하는 작업
    const handleRowClick = (params) => {

        setListUser((prevList) => {
            const index = prevList.findIndex(user => user.measurement === params.row.measurement);
            if (index === -1) return prevList; // 해당 항목이 없으면 그대로 반환

            // 클릭된 항목만 상태를 반전
            const updatedList = [...prevList]; // 기존 배열 복사
            updatedList[index] = {
                ...updatedList[index],
                status: !updatedList[index].status,
            };
            return updatedList;
        });
    };

    const columns = [
        { field: 'measurement', headerName: 'Measurement', width: 150 },
        { field: 'userid', headerName: 'User ID', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {params.row.status ? (
                        <MdCheckBox style={{color: 'green', fontSize: '40px'}}/>
                    ) : (
                        <MdCheckBoxOutlineBlank style={{color: 'skyblue', fontSize: '40px'}}/>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Paper
            sx={{
                height: 540,
                width: '100%',
                display: 'flex', // Flexbox 활성화
                flexDirection: 'row', // DataGrid와 버튼을 가로 정렬
                alignItems: 'flex-start', // 수직 정렬
                justifyContent: 'space-between', // 공간 분배
                padding: '10px',
            }}
        >
            <div style={{flex: 1}}>
                <DataGrid
                    rows={listUser}
                    columns={columns}
                    pagination={false} // 페이지네이션 비활성화
                    pageSizeOptions={[10, 15]}
                    checkboxSelection={false}
                    onRowClick={handleRowClick}
                    sx={{border: 0}}
                    components={{
                        NoRowsOverlay: () => <div>No data available</div>,
                    }}
                    getRowId={(row) => row.measurement} // measurement를 고유 ID로 사용
                />
            </div>
            <div style={{marginLeft: '10px', alignSelf: 'flex-start'}}>
                <button
                    onClick={handleModifyMeasure}
                    style={{
                        padding: '0', // 내부 여백 제거
                        fontSize: '15px',
                        width: '80px', // 행 크기와 동일하게 설정
                        height: '40px', // DataGrid 행 높이에 맞춤
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // 중앙 정렬
                        backgroundColor: '#d3d3d3', // 버튼 배경색 (밝은 회색)
                        color: '#000', // 텍스트 색상 (검은색)
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    저장
                </button>
            </div>
        </Paper>
    );
};

export default NoticeMeasure;
