import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SignUpModal = ({ show, handleSignUpClose, handleSignUpSubmit, setUser, handleChange }) => {
    return (
        <Modal show={show} onHide={handleSignUpClose}>
            <Modal.Header closeButton>
                <Modal.Title>회원가입</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicId">
                        <Form.Label column sm="3">ID</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="TopazIoT6"
                                name="id" onChange={handleChange}
                            />
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            비밀번호
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password"
                                name="pw" onChange={handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            이름
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name="userName" onChange={handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            생년월일
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="date" name="birth" onChange={handleChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                        <Form.Label column sm="3">
                            전화번호
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control type="phone" name="phone" onChange={handleChange} />
                        </Col>
                        <Col sm="2">
                            <Button style={{ padding: '6px 11px' }} >체크</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" name="userImage" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSignUpClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSignUpSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default SignUpModal;