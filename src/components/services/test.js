import React, { useState, useEffect } from 'react';
import { postMeasurePatient } from "../services/apiServices";
import './test.scss';

const Test = () => {
    const [listUser, setListUser] = useState([
        { measurement: 'spo2', status: false },
        { measurement: 'airflow', status: true },
        { measurement: 'bodytemp', status: false },
        { measurement: 'ecg', status: true },
        { measurement: 'emg', status: false },
        { measurement: 'gsr', status: true },
        { measurement: 'nibp', status: false }
    ]);


    return (
        <div className="note-list">
            <h3>측정 필요 요소</h3>
            <ul>
                {listUser.filter(item => item.status).length > 0 ? (
                    listUser
                        .filter(item => item.status)
                        .map((item, index) => (
                            <li key={index} className="note-item">
                                <div className="note-date">{item.measurement}</div>
                            </li>
                        ))
                ) : (
                    <p>필수로 검사할 요소가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default Test;
