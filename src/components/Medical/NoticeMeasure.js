import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {postMeasurePatient, postModifyMeasure} from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

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
                spo2: listUser.find(item => item.measurement === 'spo2')?.status || false,
                airflow: listUser.find(item => item.measurement === 'airflow')?.status || false,
                bodytemp: listUser.find(item => item.measurement === 'bodytemp')?.status || false,
                ecg: listUser.find(item => item.measurement === 'ecg')?.status || false,
                emg: listUser.find(item => item.measurement === 'emg')?.status || false,
                gsr: listUser.find(item => item.measurement === 'gsr')?.status || false,
                nibp: listUser.find(item => item.measurement === 'nibp')?.status || false,
            };

            postModifyMeasure(
                dataToSend.userid,
                dataToSend.spo2,
                dataToSend.airflow,
                dataToSend.bodytemp,
                dataToSend.ecg,
                dataToSend.emg,
                dataToSend.gsr,
                dataToSend.nibp
            )

            alert("필수 측정 요소 저장되었습니다.");

        } catch (error) {
            alert("서버 응답이 없습니다.");
        }

    }

    useEffect(() => {
        if (userInfo && userInfo.role && selectedUserId) {
            LoadList();
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
                <div style={{ color: params.row.status ? 'green' : 'red' }}>
                    {params.row.status ? '선택됨' : '선택 안됨'}
                </div>
            ),
        },
    ];

    return (
        <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={listUser}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 15]}
                checkboxSelection={false}
                onRowClick={handleRowClick}
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>,
                }}
                getRowId={(row) => row.measurement} // measurement를 고유 ID로 사용
            />
            <button onClick={handleModifyMeasure}>추가</button>
        </Paper>
    );
};

export default NoticeMeasure;
