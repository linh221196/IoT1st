import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./LogginView.scss"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUpModal from './SignUpModal';
import FindPwModal from './FindPwModal';
import { postCreateNewUser, postLoggin, postUserId } from './services/apiServices';
import dayjs from 'dayjs';


const LogginView = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showFindPwModal, setFindPwShowModal] = useState(false);
    const [email, setEmail] = useState('') //will disable
    const [userImage, setUserImage] = useState('') //will disable
    const [username, setUserName] = useState('') //change to Name, setName
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(''); // change to division later, (환자, 봉사자, 의료진)
    const [phoneNum, setPhoneNum] = useState('')
    const [birth, setBirth] = useState('') // change to Age?
    const [isUsable, setIsUsable] = useState(false)
    // const [SSN,setSSN] =useState('')
    // const [User_Id,setUser_Id]=useState('')

    const [validated, setValidated] = useState(false);



    const [isLoggin, setIsLoggin] = useState(false);

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
            case 'phone':
                setPhoneNum(value)
                break;
            case 'birth':
                const formattedDate = dayjs(value).format('YYYY/MM/DD')
                setBirth(formattedDate);
                break;
            default:
                break;
        }
        console.log(name, " ", value)
    };

    const handleValidated = (e) => {
        e.preventDefault(); // Ngăn submit form tự động
        e.stopPropagation(); // Ngăn việc xử lý event tiếp tục lan ra các phần tử khác
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true); // Bật cờ validated lên nếu form không hợp lệ
            return;
        }
        if (isUsable) {
            alert('사용가능 ID를 입력해주세요')
            return;
        }
        console.log('handle submit clicked')
    }

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
    //회원가입의 response처리
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        handleValidated()
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        console.log(email, password, username, birth, phoneNum, role, userImage)
        try {
            const data = await postCreateNewUser(email, password, username, birth, phoneNum, role, userImage);
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

    //로그인 기능 //비동기 처리 SSR CSR
    useEffect(() => {
        if (isLoggin) {
            console.log(userInfo.role);

            if (userInfo.role === "USER" || userInfo.role === "user") {
                navigate('/UserHome');
            }
            else if (userInfo.role === "ADMIN" || userInfo.role === "Medical") {
                navigate('/MedicalHome');
            }
            else {
                navigate('/VolunteerHome');
            }
        }
    }, [isLoggin, navigate, userInfo.role]);

    const handleLogginSubmit = (e) => {
        handleSubmitLoggin(e, email, password)
            .then((data) => {
                if (data) {
                    setIsLoggin(true);
                    dispatch(doLoggin(data));
                    navigate('/UserHome'); // Move navigate here if you need it to wait
                }
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        try {
            const data = await postLoggin(email, password);
            console.log("Check Inter Response", data);
            if (data.status === "success") {
                setIsLoggin(true)
                const Token = data.refreshToken
                localStorage.setItem('token', Token);
                alert("Login successfully!");
            } else if (data.status === "PasswordFail") {
                alert("비밀번호가 일치하지 않습니다.");
            } else if (data.status === "IdFail") {
                alert("존재하지 않는 아이디입니다.");
            }
        } catch (error) {
            alert("An error occurred while loggin. Please try again.");
        }
        console.log(`Logging in user: ${email}`);
    };

    //Id 사용가능 여부 체크
    const handleCheckId = async (e) => {
        e.preventDefault();
        try {
            const data = await postUserId(email);
            if (data.status === "duplication") {
                alert("해당 ID는 중복된 ID입니다.");
                setIsUsable(false); // 사용 불가로 설정
            } else if (data.status === "success") {
                console.log("Server Response:", data);
                alert("사용 가능한 아이디입니다.");
                setIsUsable(true); // 사용 가능으로 설정
            }
        } catch (error) {
            console.log(error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }
    return (
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="예제: topaziot6"
                    name="email" onChange={handleChange}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 입력해주세요"
                    name="password" onChange={handleChange}
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
                <NavLink onClick={handleSignUp} >회원가입</NavLink>
                {/* 부모 자식 */}
                <SignUpModal
                    show={showModal}
                    handleSignUpClose={handleSignUpClose} //function
                    handleSignUpSubmit={handleSignUpSubmit}
                    handleChange={handleChange}
                    validated={validated}
                    handleCheckId={handleCheckId}
                />
            </div>
        </Form>
    );
}

export default LogginView;