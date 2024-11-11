import { Container, Button, Image } from "react-bootstrap";
import "./UserInfo.scss"
import code from '../../assets/image.jpg'
import { FiEdit } from "react-icons/fi";
import UserInfoUpdateModal from "./UserInfoUpdateModal";
import { useEffect, useState } from 'react';
import {postVolunteerTime, putEditUserData} from "../services/apiServices";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";


const UserInfo = () => {

    const userInfo = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // console.log(userInfo)
    const [showModal, setShowModal] = useState(false);
    const [userImage, setUserImage] = useState('') //will disable
    const [username, setUserName] = useState('') //change to Name, setName
    const [validated, setValidated] = useState(false);
    const [volunteerCount, setVolunteerCount] = useState(0); // 봉사횟수 상태 추가

    const handleUpdate = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        try {
            const data = await putEditUserData(userInfo.id, username, userInfo.role, userImage)
            console.log('Check response', data)
            if (data && data.EC === 0) {
                setShowModal(false)
                alert('Updated')
            } else {
                alert(data.EM || "Something went wrong")
            }
        } catch (error) {
            alert("Error occurred")

        }
    }

    const Volunteertime = async () => {
        const data = await postVolunteerTime(userInfo.email);
        console.log('Check response', data)
        if (data && data.EC === 0) {
            setVolunteerCount(data.volunteerCount); // 봉사횟수 값 설정
        }
    }



    //여기에 처음 들어왔을 때
    useEffect(() => {
        if (userInfo && userInfo.role) {
            if (userInfo.role === "Volunteer" || userInfo.role === "user") {
                Volunteertime();
            } else if (userInfo.role === "Patient") {

            }
        }
    }, [userInfo.role]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        switch (name) {
            case 'email':
                break;
            case 'username':
                setUserName(value);
                break;
            case 'userImage':
                setUserImage(files[0]);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Container className="user-imageContainer">
                <Image className="user-image" src={userInfo?.image ? userInfo.image : code} rounded />
            </Container>
            <Paper className="paper-container" elevation={16}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row">성함</TableCell>
                            <TableCell align="right"> {userInfo?.username} </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">ID</TableCell>
                            <TableCell align="right">{userInfo?.email} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {userInfo.role === "Volunteer" ? "봉사횟수" : "의료진"}
                            </TableCell>
                            <TableCell align="right">
                                {userInfo.role === "Volunteer"
                                    ? `${volunteerCount}회`
                                    : (userInfo?.doctor?.name || '노영휸')}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </Paper>

            <div className="button-container">
                <Button variant="outline-success" className="me-3" onClick={handleUpdate} >
                    수정
                    <FiEdit />
                </Button>
                <Button variant="outline-primary" className="me-3" onClick={handleUpdate} >
                    비밀번호
                </Button>
                {isAuthenticated && 
                    <Button variant="outline-danger">
                        Loggout
                    </Button>
                }
                <UserInfoUpdateModal
                    userInfo={userInfo}
                    show={showModal}
                    handleClose={handleClose}
                    handleUpdateSubmit={handleUpdateSubmit}
                    handleChange={handleChange}
                    validated={validated}
                />
            </div>

        </div>
    );
};

export default UserInfo;