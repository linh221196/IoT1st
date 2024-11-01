import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./LogginView.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUpModal from './SignUpModal';
import FindPwModal from './FindPwModal';
import { postCreateNewUser, postLoggin, postUserId } from './services/apiServices';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { doLoggin } from '../redux/action/userAction';

const LogginView = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showFindPwModal, setFindPwShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [birth, setBirth] = useState('');
    const [isUsable, setIsUsable] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.account);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUserName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'role':
                setRole(value);
                break;
            case 'phone':
                setPhoneNum(value);
                break;
            case 'birth':
                setBirth(dayjs(value).format('YYYY/MM/DD'));
                break;
            default:
                break;
        }
    };

    const handleValidated = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return false;
        }
        setValidated(true);
        return true;
    };

    const handleSignUpSubmit = async (e) => {
        if (!handleValidated(e)) return;

        try {
            const data = await postCreateNewUser(email, password, username, birth, phoneNum, role);
            console.log("Check Inter Response", data);
            if (data.status === "success") {
                setShowModal(false);
                alert("User created successfully!");
            } else {
                alert(data.EM || "Something went wrong!");
            }
        } catch (error) {
            alert("An error occurred while creating the user. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        if (!handleValidated(e)) return;

        try {
            const data = await postLoggin(email, password);
            console.log("Check Inter Response", data);
            if (data.status === "success") {
                setIsLoggin(true);
                dispatch(doLoggin(data));
                alert("Login successfully!");
            } else if (data.status === "PasswordFail") {
                alert("비밀번호가 일치하지 않습니다.");
            } else if (data.status === "IdFail") {
                alert("존재하지 않는 아이디입니다.");
            }
        } catch (error) {
            alert("An error occurred while logging in. Please try again.");
        }
    };

    const handleCheckId = async (e) => {
        e.preventDefault();
        try {
            const data = await postUserId(email);
            if (data.status === "duplication") {
                alert("해당 ID는 중복된 ID입니다.");
                setIsUsable(false);
            } else if (data.status === "success") {
                alert("사용 가능한 아이디입니다.");
                setIsUsable(true);
            }
        } catch (error) {
            console.error(error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    useEffect(() => {
        if (isLoggin) {
            if (userInfo.role === "Patient" || userInfo.role === "user") {
                navigate('/UserHome');
            } else if (userInfo.role === "ADMIN" || userInfo.role === "Medical") {
                navigate('/MedicalHome');
            } else {
                navigate('/VolunteerHome');
            }
        }
    }, [isLoggin, navigate, userInfo.role]);

    return (
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="예제: topaziot6" name="email" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력해주세요" name="password" onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>

            <div className='findPw-container'>
                <Form.Text className="text-muted" size="sm">
                    비밀번호 잊으세요?
                </Form.Text>
                <NavLink onClick={() => setFindPwShowModal(true)}>비밀번호 찾기</NavLink>
                <FindPwModal show={showFindPwModal} handleFindPwClose={() => setFindPwShowModal(false)} />
            </div>

            <div className='signUp-container'>
                <Form.Text className="text-muted" size="sm">
                    계정이 없으세요?
                </Form.Text>
                <NavLink onClick={() => setShowModal(true)}>회원가입</NavLink>
                <SignUpModal
                    show={showModal}
                    handleSignUpClose={() => setShowModal(false)}
                    handleSignUpSubmit={handleSignUpSubmit}
                    handleChange={handleChange}
                    validated={validated}
                    handleCheckId={handleCheckId}
                />
            </div>
        </Form>
    );
};

export default LogginView;
