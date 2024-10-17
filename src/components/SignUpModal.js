import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const SignUpModal = ({ show, handleSignUpClose, handleSignUpSubmit, validated, handleChange }) => {


    return (
        <Modal show={show} onHide={handleSignUpClose}>
            <Modal.Header closeButton>
                <Modal.Title>회원가입</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSignUpSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail" hasValidation>
                        <Form.Label column sm="3">Email</Form.Label>
                        <Col sm="9">
                            <Form.Control type="email"
                                placeholder="TopazIoT6"
                                name="id"
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">이메일 입력해주세요</Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" hasValidation>
                        <Form.Label column sm="3">
                            비밀번호
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password"
                                name="pw" onChange={handleChange} required />
                            <Form.Control.Feedback type="invalid">비밀번호 입력해주세요</Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName" hasValidation>
                        <Form.Label column sm="3">
                            이름
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control required type="text" name="userName" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">이름을 입력해주세요</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge" hasValidation>
                        <Form.Label column sm="3">
                            생년월일
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control required type="date" name="birth" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">생년월일을 입력해주세요</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone" hasValidation>
                        <Form.Label column sm="3">
                            전화번호
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control required type="phone" name="phone" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">전화번호 입력해주세요</Form.Control.Feedback>
                        </Col>
                        <Col sm="2">
                            <Button style={{ padding: '6px 11px' }} >체크</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Role
                        </Form.Label>
                        <Col>
                            <div key={`inline-checkbox`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="일반 사용자"
                                    name="group1"
                                    type="checkbox"
                                    id={`inline-checkbox-1`}
                                />
                                <Form.Check
                                    inline
                                    label="봉사자"
                                    name="group1"
                                    type="checkbox"
                                    id={`inline-checkbox-2`}
                                />
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" name="userImage" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" hasValidation>
                        <Form.Check
                            required
                            label="이용약관과 동의합니다"
                            feedback="동의 체크 하셔야합니다"
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Row gap={3}>
                        <Col >
                            <Button variant="primary" type='submit' >
                                회원가입
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={handleSignUpClose}>
                                닫기
                            </Button>
                        </Col>

                    </Row>


                </Form>
            </Modal.Body>

        </Modal>
    );
};


export default SignUpModal;