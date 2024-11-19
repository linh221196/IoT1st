import React from 'react';
import { useSelector } from "react-redux";
import './HeaderBar.scss'; // SCSS 파일을 연결해 스타일을 분리

const HeaderBar = () => {
    const userInfo = useSelector(state => state.user.account);

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
                    ? `${userInfo.name}님 (${userInfo.email}) 환영합니다.`
                    : "로그인 정보를 확인할 수 없습니다."}
            </div>
        </header>
    );
};

export default HeaderBar;
