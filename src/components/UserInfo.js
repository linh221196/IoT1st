import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./UserInfo.scss"
import { NavLink } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import code from '../assets/image.jpg'
import Button from "react-bootstrap/Button";
import { FiEdit } from "react-icons/fi";
import UserInfoUpdateModal from "./UserInfoUpdateModal";
import { useState } from 'react';

const UserInfo = () => {

    const userInfo =
    {
        name: "린",
        age: "12/34/5678",
        nurse: "노영휸"

    }
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div>
            <Container className="user-imageContainer">
                <Image className="user-image" src={code} rounded />
            </Container>

            <Container  >
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        성함
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo.name}
                    </Col>
                </Row>
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        생년월일
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo.age}
                    </Col>
                </Row>
                <Row className="r-userInfo">
                    <Col className="c1-userInfo" sm="5">
                        의료진
                    </Col>
                    <Col className="c2-userInfo" sm="7">
                        {userInfo.nurse}
                    </Col>
                </Row>
            </Container>
            <div>
                <Button variant="outline-success" onClick={handleUpdate} >
                    수정
                    <FiEdit />
                </Button>

                <UserInfoUpdateModal
                    userInfo={userInfo}
                    show={showModal}
                    handleClose={handleClose}
                />
            </div>

        </div>
    );
};

export default UserInfo;