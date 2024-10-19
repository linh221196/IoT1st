import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./LogginView.scss"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignUpModal from './SignUpModal';
import FindPwModal from './FindPwModal';
import { postCreateNewUser } from './services/apiServices';

const LogginView = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showFindPwModal, setFindPwShowModal] = useState(false);
    const [email, setEmail] = useState('')
    const [userImage, setUserImage] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('');
    // const [phone, setPhone] = useState('')
    // const [birth, setBirth] = useState('')
    const [validated, setValidated] = useState(false);



    const [isLoggin, setIsLoggin] = useState(true);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
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
            case 'userImage':
                setUserImage(files[0]);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    const handleSignUp = () => {
        setShowModal(true);
    }

    const handleSignUpClose = () => {
        setShowModal(false);

    }

    const handleFindPw = () => {
        setFindPwShowModal(true);
    }

    const handleFindPwClose = () => {
        setFindPwShowModal(false);
    }
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        try {
            const data = await postCreateNewUser(email, password, username, role, userImage);
            console.log("Check Inter Response", data);
            if (data && data.EC === 0) {
                setShowModal(false);
                alert("User created successfully!");
            } else {
                alert(data.EM || "Something went wrong!");
            }
        } catch (error) {
            alert("An error occurred while creating the user. Please try again.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in user:");
        isLoggin ? navigate('/UserHome') : alert("No Way")
    };

    const handleCheckEmailExist = () => {

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="예제: topaziot6"
                    name="email"
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력해주세요"
                    name="password"
                />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
            <div className='findPw-container'>
                <Form.Text className="text-muted" size="sm">
                    비밀번호 잊으세요?
                </Form.Text>
                <NavLink onClick={handleFindPw} >비밀번호 찾기</NavLink>
                <FindPwModal
                    show={showFindPwModal}
                    handleFindPwClose={handleFindPwClose}
                />
            </div>
            <div className='signUp-container'>
                <Form.Text className="text-muted" size="sm">

                    계정이 없으세요?
                </Form.Text>
                <NavLink onClick={handleSignUp} >화원가입</NavLink>
                <SignUpModal
                    show={showModal}
                    handleSignUpClose={handleSignUpClose}
                    handleSignUpSubmit={handleSignUpSubmit}
                    handleChange={handleChange}
                    validated={validated}
                />
            </div>
        </Form>
    );
}

export default LogginView;