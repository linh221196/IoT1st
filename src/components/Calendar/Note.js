import { useState } from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card';
import "./Note.scss"
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material"
import {useSelector} from "react-redux";
import {
    postAllCallVolunteer, postAssignmentCancel, postVolunteerCallDelete, postVolunteerCallModify,
    postVolunteerAssignment,
    postVolunteerassignment,
    postVolunteerComplete
} from "../services/apiServices";

const Note = ({ noteList, setNoteList, note, setNote, newValue, isFirstList, handleCancelAction, handleAssignmentAction }) => {
    //리듁스에서 꺼내오기
    const userInfo = useSelector(state => state.user.account)

    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    //수정 버튼(modal 띄우기)
    const handleEdit = (index) => {
        setEditIndex(index);
        setNote(noteList[index].noteContent);
        setShowModal(true);
    }
    //list 수정 취소
    const handleClose = () => {
        setShowModal(false);
        setEditIndex(null);
    };
    //list 수정
    const handleSubmit = async () => {
        if (note.trim()) {
            try {
                // API 호출
                const email = userInfo.email;
                const notedate = noteList[editIndex].noteDate;
                const text = note;

                console.log('email: ', userInfo?.email, ' noteDate: ', notedate, 'text: ', text)
                const data = await postVolunteerCallModify(email, notedate, text);
                console.log('Check response', data);
                //수정 내용 반영
                const updatedNoteList = [...noteList];
                updatedNoteList[editIndex] = {
                    noteDate: noteList[editIndex].noteDate,
                    noteContent: note
                };
                setNoteList(updatedNoteList);
                setNote("");
                setShowModal(false);

                alert("수정이 완료되었습니다.");

            } catch (error) {
                console.error("Error occurred:", error);
                alert("수정한 것을 저장에 실패했습니다.");
            }
        } else {
            alert("내용을 입력해주세요.");
        }
    };
    //list 삭제
    const handleDelete = async (index) => {
        try {
            const email = userInfo.email;
            const notedate = noteList[index].noteDate;

            // 삭제 API 호출
            const data = await postVolunteerCallDelete(email, notedate);
            console.log('Check response', data);

            // API 호출이 성공한 후 noteList에서 항목 제거
            setNoteList(prev => prev.filter((_, i) => i !== index));

            alert("삭제되었습니다.");

        } catch (error) {
            console.error("Error occurred:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }

    //봉사 완료
    const handleCompleteAction = async (index) => {
        try {
            const note = noteList[index];
            console.log('front data :', userInfo.email, note.noteEmail, note.noteDate);
            const data = await postVolunteerComplete(userInfo.email, note.noteEmail, note.noteDate);
            console.log('Check response');

            // API 호출이 성공하면 noteList에서 항목 제거
            setNoteList(prev => prev.filter((_, i) => i !== index));

            alert("봉사가 완료되었습니다.");

        } catch (error) {
            alert("예상치 못한 문제로 봉사완료에 실패했습니다.");
        }
    };

    //봉사 확정
    /*
    const handleAssignmentAction = async (index) => {
        try {
            const note = noteList[index];
            console.log(userInfo.email, note.noteEmail, note.noteDate, note.noteContent);
            const data = await postVolunteerAssignment(userInfo.email, note.noteEmail, note.noteDate, note.noteContent);
            console.log('Check response');

            // 성공적으로 API 호출이 완료되면 noteList에서 항목 제거하고 secondNoteList에 추가
            setNoteList(prev => prev.filter((_, i) => i !== index));
            setSecondNoteList(prev => [
                ...prev,
                {
                    ...note,
                    noteName2: userInfo.username, // 봉사자 이름 추가
                    noteEmail2: userInfo.email // 봉사자 이메일 추가
                }
            ]);

        } catch (error) {
            alert("예상치 못한 문제로 봉사확정이 실패했습니다.");
        }
    };

     */

    //봉사 취소
    /*
    const handleCancel = async (index) => {
        try {
            const note = noteList[index];
            console.log('front data :', note.noteEmail2, note.noteEmail, note.noteDate, note.noteContent);
            const data = await postAssignmentCancel(note.noteEmail2, note.noteEmail, note.noteDate, note.noteContent);
            console.log('Check response');

            // 성공적으로 API 호출이 완료되면 secondNoteList에서 항목 제거하고 noteList에 추가
            setSecondNoteList(prev => prev.filter((_, i) => i !== index));
            setNoteList(prev => [
                ...prev,
                {
                    ...note,
                    noteName: note.noteName, // 환자 이름
                    noteEmail: note.noteEmail // 환자 이메일
                }
            ]);

        } catch (error) {
            alert("Error occurred");
        }
    }
     */

    return (

        <div className="note-card" >

            {noteList.map((item, index) =>
                <Card body className="card-item" style={{ marginBottom: 10 }} key={item.noteDate + index}>
                    <Row>
                        <Col sm={8}>
                            <p>환자 이름: {item.noteName}</p>
                            {!isFirstList && (
                                <>
                                    <p>봉사자 이름: {item.noteName2}</p>
                                </>
                            )}
                            <p>날짜: {item.noteDate}</p>
                        </Col>
                        <Col>
                            {isFirstList && (
                                <>
                                    {userInfo.role === "Patient" && (
                                        <>
                                            <Button variant="success" onClick={() => handleEdit(index)}>
                                                <MdEdit size={20} />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(index)}>
                                                <MdDeleteForever size={20} />
                                            </Button>
                                        </>
                                    )}
                                    {userInfo.role === "Volunteer" &&(
                                        <>
                                            <Button variant="primary" onClick={() => handleAssignmentAction(index)}>봉사확정</Button>
                                        </>
                                    )}
                                </>
                            )}
                            {!isFirstList && (
                                <>
                                    {userInfo.role === "Volunteer" && (
                                        <>
                                            <Button variant="secondary" onClick={() => handleCompleteAction(index)}>봉사완료</Button>
                                        </>
                                    )}
                                    <Button variant="info" onClick={() => handleCancelAction(index)}>취소하기</Button>
                                </>
                            )}
                        </Col>
                    </Row>

                    <p>내용: {item.noteContent}</p>
                </Card>
            )}

            <Modal show={showModal} onHide={handleClose} style={{ minHeight: '300px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{noteList[editIndex]?.noteDate}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: '200px' }}>
                    <TextField
                        label="내용을 입력해주세요"
                        fullWidth
                        multiline
                        value={note} type="text"
                        onChange={e => setNote(e.target.value)}

                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { handleSubmit() }}>수정</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    )

}

export default Note