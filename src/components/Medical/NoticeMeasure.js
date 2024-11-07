import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postDeletePatient, postMeasurePatient } from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

const NoticeMeasure = ({ selectedUserId }) => {
    // Redux에서 userInfo 가져오기
    const userInfo = useSelector(state => state.user.account);

    // 임시 데이터: role은 boolean으로 설정하고 userid 추가
    const initialListUser = [
        { username: 'a', userid: '001', role: true },
        { username: 'b', userid: '002', role: false },
        { username: 'c', userid: '003', role: false },
        { username: 'd', userid: '004', role: true },
    ];

    const [listUser, setListUser] = useState(initialListUser);
    const [called, setCalled] = useState(false);

    const LoadList = async () => {
        try {
            console.log('userid: ', selectedUserId);
            const data = await postMeasurePatient(selectedUserId);
            console.log('Check response', data);
            // data를 기반으로 listUser를 업데이트할 수 있습니다.
        } catch (error) {
            alert("서버 응답이 없습니다.");
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.role && !called) {
            if (userInfo.role === "Medical" || userInfo.role === "user") {
                LoadList();
            }
            setCalled(true); // 한 번 호출 후 재호출 방지
        }
    }, [userInfo.role, called, selectedUserId]);

    // 행을 클릭할 때 실행되는 함수
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
