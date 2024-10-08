import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const FindPwModal = ({ userInfo, show, handleFindPwClose }) => {
    return (
        <Modal show={show} onHide={handleFindPwClose}>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="3">이메일</Form.Label>
                        <Col sm="9">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            이름
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            생년월일
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            전화번호
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control type="phone" />
                        </Col>
                        <Col sm="2">
                            <Button style={{ padding: '6px 11px' }} >체크</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleFindPwClose}>
                    Close
                </Button>

                <Button variant="primary" onClick={handleFindPwClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FindPwModal;

