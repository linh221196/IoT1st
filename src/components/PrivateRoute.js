import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
    const userInfo = useSelector((state) => state.user.account);

    // 사용자가 로그인하지 않았거나 허용된 역할이 아닌 경우
    if (!userInfo?.role || !allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/" replace />;
    }

    // 허용된 경우 컴포넌트를 렌더링
    return children;
};

export default PrivateRoute;