import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {postDeletePatient, postLoadPatient} from "../services/apiServices";

const paginationModel = { page: 0, pageSize: 10 };

const UserTable = ({ list }) => {
    const userInfo = useSelector(state => state.user.account)
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionChange = (selection) => {
        setSelectedRows(selection);
        console.log("Selected row IDs:", selection);
    };

    const handleDelete = async (email) => {
        try {
            console.log("front",userInfo.email, email);
            const data = await postDeletePatient(userInfo.email, email)
            console.log('Check response', data);

        } catch (error) {
            alert("서버 응답이 없습니다.");
        }

    };

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
                checkboxSelection
                onSelectionModelChange={handleSelectionChange}
                sx={{ border: 0 }}
                components={{
                    NoRowsOverlay: () => <div>No data available</div>,
                }}
                getRowId={(row) => row.useremail} // useremail을 고유 ID로 사용
            />
            <div style={{ marginTop: '10px' }}>
                선택된 사용자 ID: {selectedRows.join(", ")}
            </div>
        </Paper>
    );
};

export default UserTable;
