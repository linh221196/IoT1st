import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const paginationModel = { page: 0, pageSize: 10 };

const NoticeMeasure = () => {
    // Redux에서 userInfo 가져오기
    const userInfo = useSelector(state => state.user.account);

    // 임시 데이터: role은 boolean으로 설정하고 userid 추가
    const initialListUser = [
        { username: 'a', userid: '001', role: true },
        { username: 'b', userid: '002', role: false },
        { username: 'c', userid: '003', role: false },
        { username: 'd', userid: '004', role: true },
    ];

    // 상태 관리
    const [listUser, setListUser] = useState(initialListUser);

    const handleRowClick = (params) => {
        // userInfo.role이 "Patient"이면 클릭 시 아무 작업도 수행하지 않음
        if (userInfo.role === "Patient") return;

        const updatedList = listUser.map(user => {
            if (user.username === params.row.username) { // params.row.username 사용
                // 클릭한 사용자의 role 값을 반전시킴
                return { ...user, role: !user.role };
            }
            return user;
        });
        setListUser(updatedList);
    };

    const columns = [
        { field: 'username', headerName: 'User Name', width: 150 },
        { field: 'userid', headerName: 'User ID', width: 150 }, // userid 열 추가
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
                checkboxSelection={false} // 체크박스 제거
                onRowClick={handleRowClick} // 행 클릭 핸들러
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>,
                }}
                getRowId={(row) => row.username} // 각 행의 고유 ID를 username으로 설정
            />
        </Paper>
    );
}

export default NoticeMeasure;
