import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {postMeasurePatient, postModifyMeasure} from "../services/apiServices";
import { MdCheckBox } from "react-icons/md"; //체크 표시
import { MdCheckBoxOutlineBlank } from "react-icons/md"; //빈표시

const NoticeMeasure = ({ selectedUserId }) => {
    const userInfo = useSelector(state => state.user.account);
    const [listUser, setListUser] = useState([
        { measurement: 'spo2', userid: selectedUserId, status: 'spo2' },
        { measurement: 'airflow', userid: selectedUserId, status: 'airflow' },
        { measurement: 'bodytemp', userid: selectedUserId, status: 'bodytemp' },
        { measurement: 'ecg', userid: selectedUserId, status: 'ecg' },
        { measurement: 'emg', userid: selectedUserId, status: 'emg' },
        { measurement: 'gsr', userid: selectedUserId, status: 'gsr' },
        { measurement: 'nibp', userid: selectedUserId, status: 'nibp' },
        { measurement: 'eog', userid: selectedUserId, status: 'eog' },
    ]);

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
    //추가 버튼을 눌러 백엔드로 list값 보내기
    const handleModifyMeasure = async () => {
        try {
            //list에서 필요 데이터 추출
            const dataToSend = {
                userid: selectedUserId,
                spo2: listUser.find(item => item.measurement === 'spo2')?.status || false.toString(),
                airflow: listUser.find(item => item.measurement === 'airflow')?.status || false.toString(),
                bodytemp: listUser.find(item => item.measurement === 'bodytemp')?.status || false.toString(),
                ecg: listUser.find(item => item.measurement === 'ecg')?.status || false.toString(),
                emg: listUser.find(item => item.measurement === 'emg')?.status || false.toString(),
                gsr: listUser.find(item => item.measurement === 'gsr')?.status || false.toString(),
                nibp: listUser.find(item => item.measurement === 'nibp')?.status || false.toString(),
                eog: listUser.find(item => item.measurement === 'eog')?.status || false.toString(),
            };

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

    const handleRowClick = (params) => {
        if (userInfo.role === "Patient") return;

        const updatedList = listUser.map(user => {
            if (user.measurement === params.row.measurement) {
                return { ...user, status: !user.status };
            }
            return user;
        });
        setListUser(updatedList);
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
