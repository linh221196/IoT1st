import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./UserInfo.scss"
import Image from 'react-bootstrap/Image';
import code from '../../assets/image.jpg'
import Button from "react-bootstrap/Button";
import { FiEdit } from "react-icons/fi";
import UserInfoUpdateModal from "./UserInfoUpdateModal";
import { useState } from 'react';
import { useFetchUser } from "../services/useFetchUser";
import { putEditUserData } from "../services/apiServices";

const UserInfo = () => {

    const { listUser } = useFetchUser()
    const userInfo = listUser.find(user => user.id === 8)
    console.log(userInfo)
    const [showModal, setShowModal] = useState(false);
    const [userImage, setUserImage] = useState('') //will disable
    const [username, setUserName] = useState('') //change to Name, setName
    const [validated, setValidated] = useState(false);

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

            <Container  >
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        성함
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo?.username}
                    </Col>
                </Row>
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        이메일 또는 ID
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo?.email}
                    </Col>
                </Row>
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        의료진
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo?.doctor?.name ? userInfo.doctor.name : '노영휸'}
                    </Col>
                </Row>
            </Container>
            <div>
                <Button variant="outline-success" className="me-3" onClick={handleUpdate} >
                    수정
                    <FiEdit />
                </Button>
                <Button variant="outline-danger" onClick={handleUpdate} >
                    비밀번호

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