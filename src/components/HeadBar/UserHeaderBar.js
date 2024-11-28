import React from 'react';
import { useSelector } from "react-redux";
import './UserHeaderBar.scss';
import {useNavigate} from "react-router-dom"; // SCSS 파일을 연결해 스타일을 분리

const UserHeaderBar = () => {
    const userInfo = useSelector(state => state.user.account);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); // 로고 클릭 시 홈으로 이동
    };

    return (
        <header className="header-bar">
            {/* 로고 */}
            <div className="header-logo" onClick={handleLogoClick} style={{cursor: 'pointer'}}>
                헬스케어 웹서비스
            </div>

            {/* 메뉴 링크 */}
            {userInfo.role !== "Volunteer" && (
                <nav className="header-nav">
                    <a href="/DeviceView" className="header-link">기기안내</a>
                    <a href="/Measurement" className="header-link">측정지수</a>
                    <a href="/Volunteer" className="header-link">자원봉사</a>
                </nav>
            )}

            {/* 오른쪽 정보 */}
            <div className={`header-user-info ${!userInfo.role ? "hidden" : ""}`}>
                {userInfo?.role
                    ? `${userInfo.username}님 (${userInfo.email}) 환영합니다.`
                    : "로그인 정보를 확인할 수 없습니다."}
            </div>
        </header>
    );
};

export default UserHeaderBar;
