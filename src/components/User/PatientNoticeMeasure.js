import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { postMeasurePatient } from "../services/apiServices";

const PatientNoticeMeasure = ({ showNoticeModal, setNoticeModalShow, fullscreen, selectedUserId }) => {
    const [listUser, setListUser] = useState([
        { measurement: 'spo2', status: false },
        { measurement: 'airflow', status: true },
        { measurement: 'bodytemp', status: false },
        { measurement: 'ecg', status: true },
        { measurement: 'emg', status: false },
        { measurement: 'gsr', status: true },
        { measurement: 'nibp', status: false }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await postMeasurePatient(selectedUserId);

                const newList = [
                    { measurement: 'spo2', userid: selectedUserId, status: data.spo2 },
                    { measurement: 'airflow', userid: selectedUserId, status: data.airflow },
                    { measurement: 'bodytemp', userid: selectedUserId, status: data.bodytemp },
                    { measurement: 'ecg', userid: selectedUserId, status: data.ecg },
                    { measurement: 'emg', userid: selectedUserId, status: data.emg },
                    { measurement: 'gsr', userid: selectedUserId, status: data.gsr },
                    { measurement: 'nibp', userid: selectedUserId, status: data.nibp },
                ];

                setListUser(newList); // 데이터를 newList 형태로 listUser에 저장
            } catch (error) {
                alert("서버에서 필수측정요소를 불러오는 중 오류가 발생했습니다.");
            }
        };

        if (showNoticeModal) fetchData();
    }, [showNoticeModal, selectedUserId]);

    return (
        <Modal
            show={showNoticeModal}
            fullscreen={fullscreen}
            onHide={() => setNoticeModalShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>주의할 요소</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {listUser.filter(item => item.status).length > 0 ? (
                        listUser
                            .filter(item => item.status)
                            .map((item, index) => (
                                <li key={index}>
                                    {item.measurement}: 활성
                                </li>
                            ))
                    ) : (
                        <li>필수로 검사할 요소가 없습니다.</li>
                    )}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default PatientNoticeMeasure;