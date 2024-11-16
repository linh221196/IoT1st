import React from 'react';
import {useSelector} from "react-redux";

const HeaderBar = () => {
    const userInfo = useSelector(state => state.user.account)

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#333',
                color: '#fff',
                padding: '10px 20px',
                position: 'fixed',
                width: '100%',
                top: 0,
                zIndex: 1000,
            }}
        >
            {/* 로고 */}
            <div
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                케어 메이트
            </div>

            {/* 메뉴 링크 */}
            <nav style={{ display: 'flex', gap: '20px' }}>
                <a
                    href="/MedicalHome"
                    style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    MedicalHome
                </a>
                <a
                    href="/MedicalAdd"
                    style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    MedicalAddPatient
                </a>
            </nav>

            {/* 오른쪽 글귀 */}
            <div
                style={{
                    fontSize: '16px',
                    fontStyle: 'italic',
                }}
            >
                {userInfo && userInfo.name && userInfo.email
                    ? `${userInfo.name}님 (${userInfo.email}) 환영합니다.`
                    : "로그인 정보를 확인할 수 없습니다."}
            </div>
        </div>
    );
};

export default HeaderBar;
