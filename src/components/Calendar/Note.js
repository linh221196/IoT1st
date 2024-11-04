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

const Note = ({ noteList, setNoteList, note, setNote, newValue }) => {
    //리듁스에서 꺼내오기
    const userInfo = useSelector(state => state.user.account)

    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleEdit = (index) => {
        setEditIndex(index);
        setNote(noteList[index].noteContent);
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
        setEditIndex(null);
    };

    const handleSubmit = () => {
        if (note.trim()) {
            const updatedNoteList = [...noteList];
            updatedNoteList[editIndex] = {
                noteDate: noteList[editIndex].noteDate,
                noteContent: note
            };
            setNoteList(updatedNoteList);
            setNote("");
            setShowModal(false);

        } else {
            alert("내용을 입력해주세요.");
        }
    };

    const handleDelete = (index) => {
        setNoteList(prev => prev.filter((_, i) => i !== index))
    }

    //새로 추가
    const handleNewAction = () => {
        // 새로 추가할 버튼에 대한 로직을 여기에 작성
        console.log("새 버튼 동작");
    };


    return (


        <div className="note-card" >

            {noteList.map((item, index) =>
                <Card body className="card-item" style={{ marginBottom: 10 }} key={item.noteDate + index}>
                    <Row>
                        <Col sm={8}>
                            <p>{item.noteName}</p>
                            <p>{item.noteDate}</p>
                        </Col>
                        <Col>
                        <Button variant="success"
                                onClick={() => handleEdit(index)}
                            ><MdEdit size={20} /></Button>
                            <Button variant="danger"
                                onClick={() => handleDelete(index)}
                            ><MdDeleteForever size={20} /></Button>
                        </Col>
                    </Row>

                    <p>{item.noteContent}</p>
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
                    {userInfo.role === "Patient" && (
                        <>
                            <Button onClick={() => { handleSubmit() }}>수정</Button>
                            <Button variant="secondary" onClick={handleClose}>
                                취소
                            </Button>
                        </>
                    )}
                    {userInfo.role === "Volunteer" && (
                        <Button variant="primary" onClick={handleNewAction}>봉사확정</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>


    )

}

export default Note