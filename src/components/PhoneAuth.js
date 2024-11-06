import React, { useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([
        { username: 'a', role: true },
        { username: 'b', role: true },
        { username: 'c', role: true },
    ]);

    const toggleRole = (index) => {
        const updatedUsers = [...users];
        updatedUsers[index].role = !updatedUsers[index].role;
        setUsers(updatedUsers);
    };

    return (
        <div>
            {users.map((user, index) => (
                <div
                    key={index}
                    onClick={() => toggleRole(index)}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: user.role ? 'lightgreen' : 'lightcoral', // 역할에 따라 색상 변경
                        padding: '10px',
                        margin: '5px',
                        border: '1px solid #ccc',
                    }}
                >
                    {user.username} - {user.role ? '선택됨' : '선택 안됨'}
                </div>
            ))}
        </div>
    );
};

export default UserList;