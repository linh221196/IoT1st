import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postMeasurePatient } from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

const NoticeMeasure = ({ selectedUserId }) => {
    const userInfo = useSelector(state => state.user.account);
    const [listUser, setListUser] = useState([
        { username: 'a', userid: '001', role: true },
        { username: 'b', userid: '002', role: false },
        { username: 'c', userid: '003', role: false },
        { username: 'd', userid: '004', role: true },
    ]);

    const LoadList = async () => {
        try {
            console.log('Selected User ID: ', selectedUserId);
            const data = await postMeasurePatient(selectedUserId);
            console.log('Check response', data);
            // 필요한 경우 listUser 업데이트
        } catch (error) {
            alert("서버 응답이 없습니다.");
        }
    };

    // selectedUserId가 변경될 때마다 LoadList를 호출
    useEffect(() => {
        if (userInfo && userInfo.role && selectedUserId) {
            LoadList();
        }
    }, [userInfo.role, selectedUserId]);

    const handleRowClick = (params) => {
        if (userInfo.role === "Patient") return;

        const updatedList = listUser.map(user => {
            if (user.username === params.row.username) {
                return { ...user, role: !user.role };
            }
            return user;
        });
        setListUser(updatedList);
    };

    const columns = [
        { field: 'username', headerName: 'User Name', width: 150 },
        { field: 'userid', headerName: 'User ID', width: 150 },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params) => (
                <div style={{ color: params.row.role ? 'green' : 'red' }}>
                    {params.row.role ? '선택됨' : '선택 안됨'}
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
                getRowId={(row) => row.username}
            />
        </Paper>
    );
};

export default NoticeMeasure;
