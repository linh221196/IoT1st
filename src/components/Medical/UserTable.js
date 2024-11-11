// UserTable.js
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { postDeletePatient } from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

const UserTable = ({ list, onSelectUser }) => {
    const userInfo = useSelector(state => state.user.account);

    // onRowClick 콜백 함수
    const handleRowClick = (params) => {
        const selectedUserId = params.row.useremail;
        console.log('UserTable에서 선택한 userId (onRowClick):', selectedUserId);
        onSelectUser(selectedUserId);
    };

    // 삭제 기능
    const handleDelete = async (email) => {
        try {
            const data = await postDeletePatient(userInfo.email, email);
            if (data && data.status === "success") { // 원하는 응답 데이터와 형식에 따라 조건 설정
                console.log('삭제 성공:', data);
            } else {
                console.error('응답 데이터가 예상과 다릅니다:', data);
            }
        } catch (error) {
            console.error("삭제 요청 중 오류 발생:", error);
            alert("삭제 기능 서버 응답이 없습니다.");
        }
    };

    // DataGrid의 열 정의
    const columns = [
        { field: 'username', headerName: '환자 이름', width: 150 },
        { field: 'useremail', headerName: '이메일', width: 200 },
        { field: 'userbirth', headerName: '생년월일', width: 150 },
        {
            field: 'action',
            headerName: '액션',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.useremail)}
                >
                    삭제
                </Button>
            ),
        },
    ];

    return (
        <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={list}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 15]}
                checkboxSelection={false}
                onRowClick={(params) => handleRowClick(params)} // 인라인으로 콜백 전달
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>,
                }}
                getRowId={(row) => row.useremail}
            />
        </Paper>
    );
};

export default UserTable;
