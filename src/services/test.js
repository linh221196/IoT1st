import React from 'react';
import './test.scss';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../redux/action/userAction";

const Test = ({ role = 'Guest' }) => { //Patient, Volunteer, Guest, Medical
    const userInfo = useSelector(state => state.user.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <header className="header-bar">
            {/* 로고 */}
            <div className="header-logo">헬스케어 웹서비스</div>

            {/* 조건부 메뉴 렌더링 */}
            <nav className={`header-nav ${role}`}>
                {role === "Patient" || role === "Guest" ? (
                    <>
                        <a href="/DeviceView" className="header-link">기기안내</a>
                        <a href="/Measurement" className="header-link">측정지수</a>
                        <a href="/Volunteer" className="header-link">봉사자요청</a>
                    </>
                ) : role === "Medical" ? (
                    <>
                        <a href="/MedicalHome" className="header-link">Home</a>
                        <a href="/MedicalChart" className="header-link">Charts</a>
                        <a href="/MedicalAdd" className="header-link">AddPatient</a>
                    </>
                ) : null}
            </nav>

            {/* 오른쪽 정보 */}
            <div className={`header-user-info ${role === "Guest" ? "hidden" : ""}`}>
                {role !== "Guest" ? (
                    <>
                        {`${userInfo.username}님 (${userInfo.email}) 환영합니다.`}
                        <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                            style={{ marginLeft: "20px" }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </header>
    );
};

export default Test;