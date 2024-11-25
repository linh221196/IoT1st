import React, {useState} from 'react';
import { useSelector } from "react-redux";
import './HeaderBar.scss';
import {logoutUser} from "../../redux/action/userAction";
import {Button} from "react-bootstrap"; // SCSS 파일을 연결해 스타일을 분리
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


const HeaderBar = () => {
    const userInfo = useSelector(state => state.user.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('logoutUser 디스패치 호출');
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <header className="header-bar">
            {/* 로고 */}
            <div className="header-logo">케어 메이트</div>

            {/* 메뉴 링크 */}
            <nav className="header-nav">
                <a href="/MedicalHome" className="header-link">MedicalHome</a>
                <a href="/MedicalAdd" className="header-link">MedicalAddPatient</a>
            </nav>

            {/* 오른쪽 정보 */}
            <div className="header-user-info">
                {userInfo && userInfo.role === "Medical"
                    ? `${userInfo.username}님 (${userInfo.email}) 환영합니다.`
                    : "로그인 정보를 확인할 수 없습니다."}
            </div>
            <Button variant="outline-danger" onClick={handleLogout}>
                Logout
            </Button>
        </header>
    );
};

export default HeaderBar;
