import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const paginationModel = { page: 0, pageSize: 10 };

const NoticeMeasure = (list) => {
    // 임시 데이터
    const listUser = [
        { id: 1, username: 'john_doe', role: 'Admin', email: 'john@example.com' },
        { id: 2, username: 'jane_doe', role: 'User', email: 'jane@example.com' },
        { id: 3, username: 'sam_smith', role: 'User', email: 'sam@example.com' },
        { id: 4, username: 'alex_jones', role: 'Moderator', email: 'alex@example.com' },
    ];

    // 선택된 행의 ID를 저장하는 상태
    const [selectedRows, setSelectedRows] = useState([]);

    // 선택된 행이 변경될 때 호출되는 함수
    const handleSelectionChange = (selection) => {
        setSelectedRows(selection);
        console.log("Selected row IDs:", selection); // 선택된 행의 ID 출력
    };

    // 필요한 열만 남긴 columns 배열
    const columns = [
        { field: 'username', headerName: 'User Name', width: 150 },
    ];

    return (
        <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={listUser} // listUser 데이터 전달
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 15]}
                checkboxSelection // 체크박스 선택 기능 유지
                onSelectionModelChange={handleSelectionChange} // 선택 변경 핸들러
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>, // 데이터 없음 메시지
                }}
            />
            <div style={{ marginTop: '10px' }}>
                선택된 사용자 ID: {selectedRows.join(", ")}
            </div>
        </Paper>
    );
}

export default NoticeMeasure;
