import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Button from '@mui/material/Button';

const paginationModel = { page: 0, pageSize: 10 };

const UserTable = ({ list }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionChange = (selection) => {
        setSelectedRows(selection);
        console.log("Selected row IDs:", selection);
    };

    const handleDelete = (id) => {
        console.log(`Deleting patient with ID: ${id}`);
    };

    const columns = [
        { field: 'name', headerName: '환자 이름', width: 150 },
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
                checkboxSelection
                onSelectionModelChange={handleSelectionChange}
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>,
                }}
                getRowId={(row) => row.useremail || row.username} // 고유 id 지정 (useremail을 id로 사용)
            />
            <div style={{ marginTop: '10px' }}>
                선택된 사용자 ID: {selectedRows.join(", ")}
            </div>
        </Paper>
    );
};

export default UserTable;
