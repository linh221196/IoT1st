import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postMeasurePatient } from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

const NoticeMeasure = ({ selectedUserId }) => {
    const userInfo = useSelector(state => state.user.account);
    const [listUser, setListUser] = useState([
        { measurement: 'a', userid: selectedUserId, status: true },
        { measurement: 'b', userid: selectedUserId, status: false },
        { measurement: 'c', userid: selectedUserId, status: false },
        { measurement: 'd', userid: selectedUserId, status: true },
    ]);

    const LoadList = async () => {
        try {
            console.log('Selected User ID: ', selectedUserId);
            const data = await postMeasurePatient(selectedUserId);
            console.log('Check response', data);

            const newList = [
                { measurement: 'spo2', userid: selectedUserId, status: data.spo2 },
                { measurement: 'airflow', userid: selectedUserId, status: data.airflow },
                { measurement: 'bodytemp', userid: selectedUserId, status: data.bodytemp },
                { measurement: 'ecg', userid: selectedUserId, status: data.ecg },
                { measurement: 'emg', userid: selectedUserId, status: data.emg },
                { measurement: 'gsr', userid: selectedUserId, status: data.gsr },
                { measurement: 'nibp', userid: selectedUserId, status: data.nibp },
            ];

            setListUser(newList);
        } catch (error) {
            alert("서버 응답이 없습니다.");
        }
    };

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
            <button>추가</button>
        </Paper>
    );
};

export default NoticeMeasure;
