import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/apiServices'
import Button from 'react-bootstrap/Button';
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


const paginationModel = { page: 0, pageSize: 10 };

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    const fetchListUser = async () => {
        let res = await getAllUsers()
        console.log(res)
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    useEffect((res) => {
        fetchListUser()
    }, []);
    const handleEdit = (row) => {
        console.log("Edit user:", row);
        // Implement your edit logic here, like opening a modal with user details
    };
    const handleDelete = (row) => {
        console.log("Delete user:", row);
        // Implement your delete logic here, like showing a confirmation dialog
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'User Name', width: 130 },
        {
            field: 'role',
            headerName: 'ROLE',
            type: 'string',
            width: 90,
        },
        { field: 'email', headerName: 'Email', width: 210 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 130,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        onClick={() => handleEdit(params.row)}
                        sx={{ marginRight: 1 }}
                    >
                        <MdEdit size={20} />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleDelete(params.row)}
                    >
                        <MdDeleteForever size={20} />
                    </Button>
                </>
            ),
        },
    ];
    return (
        listUser && listUser.length > 0 ?
            (<Paper sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={listUser}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[ 10, 15]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>)

            : <>No User </>
    )
}
export default UserTable