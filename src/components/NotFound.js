import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // 홈 페이지로 이동
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>페이지를 찾을 수 없습니다.</p>
            <button
                onClick={handleGoHome}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                홈으로 돌아가기
            </button>
        </div>
    );
}

export default NotFound;