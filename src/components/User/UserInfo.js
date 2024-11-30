import { Container, Button, Image } from "react-bootstrap";
import "./UserInfo.scss"
import code from '../../assets/userimage.png'
import { FiEdit } from "react-icons/fi";
import UserInfoUpdateModal from "./UserInfoUpdateModal";
import { useEffect, useState } from 'react';
import {postMedicalName, postVolunteerTime, putEditUserData} from "../../services/apiServices";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';


const UserInfo = () => {

    const navigate = useNavigate();
    const userInfo = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // console.log(userInfo)
    const [showModal, setShowModal] = useState(false);
    const [userImage, setUserImage] = useState('') //will disable
    const [username, setUserName] = useState('') //change to Name, setName
    const [validated, setValidated] = useState(false);
    const [volunteerCount, setVolunteerCount] = useState(0); // 봉사횟수 상태 추가
    const [doctor, setDoctor] = useState('없음');
    const dispatch = useDispatch();


    const handleLogout = () => {
        console.log('logoutUser 디스패치 호출');
        dispatch(logoutUser());
        navigate('/');
    };



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

    //봉사 횟수 가져오기
    const Volunteertime = async () => {
        try {
            const data = await postVolunteerTime(userInfo.email);
            console.log('Check response', data)

            if (data && data.volunteertime) { // "volunteertime" 값이 있을 때만 설정
                setVolunteerCount(parseInt(data.volunteertime));
            }
        } catch (error) {
            alert("서버에서 봉사횟수를 불러오지 못했습니다.")
        }
    }

    //담당 의료진 이름 가져오기
    const MedicalName = async () => {
        try {
            const data = await postMedicalName(userInfo.email);
            console.log('Check response', data)

            if (data && data.name) {
                setDoctor(data.name);
            }else {
                setDoctor('없음'); // 기본값 설정
            }
        } catch (error) {
            alert("서버에서 담당의료진을 불러오지 못했습니다.")
        }
    }


    //여기에 처음 들어왔을 때
    useEffect(() => {
        if (userInfo && userInfo.role) {
            if (userInfo.role === "Volunteer" || userInfo.role === "user") {
                Volunteertime();
            } else if (userInfo.role === "Patient") {
                MedicalName();
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

    //userInfo.role에 따라 위치 조정
    const getTransformValue = (role) => {
        switch (role) {
            case 'Volunteer':
                return 'translateY(-40px)';
            default:
                return 'translateY(40px)';
        }
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                margin: '0 auto',
                transform: getTransformValue(userInfo.role), // UserInfo의 세로 위치 조정
            }}
        >
            <Container className="user-imageContainer">
                <Image className="user-image" src={userInfo?.image ? userInfo.image : code} rounded/>
            </Container>
            <Paper className="paper-container" elevation={16}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">성함</TableCell>
                            <TableCell align="right"> {userInfo?.username} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">ID</TableCell>
                            <TableCell align="right">{userInfo?.email} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {userInfo.role === "Volunteer" ? "봉사횟수" : "담당의료진"}
                            </TableCell>
                            <TableCell align="right">
                                {userInfo.role === "Volunteer"
                                    ? `${volunteerCount}회`
                                    : doctor}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </Paper>

            <div className="button-container">
                {/*<Button variant="outline-success" className="me-3" onClick={handleUpdate} >
                    수정
                    <FiEdit />
                </Button>
                <Button variant="outline-primary" className="me-3" onClick={handleUpdate} >
                    비밀번호
                </Button>*/}
                <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                </Button>
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