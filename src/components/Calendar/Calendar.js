import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {PickersDay, StaticDatePicker} from '@mui/x-date-pickers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Badge, TextField} from "@mui/material"
import "./Calendar.scss"
import Note from './Note';
import {
    postAllCallVolunteer,
    postCallVolunteer,
    postUserCall,
    postUserVolunteerCall,
    putEditUserData
} from "../services/apiServices";
import userInfo from "../User/UserInfo";
import {useSelector} from "react-redux";
dayjs.locale('ko');

const Calendar = () => {
    const [called, setCalled] = useState(false);

    //리듁스에서 꺼내오기
    const userInfo = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const [newValue, setValue] = useState(dayjs())
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState("")
    const [noteList, setNoteList] = useState([
        { noteName : "홍길동", noteDate: "2024-11-05", noteContent: "1st note", noteEmail: "1234@naver.com" },
        { noteName : "정희원", noteDate: "2024-11-08", noteContent: "2nd note", noteEmail: "5678@naver.com" },
    ]);
    const [secondNoteList, setSecondNoteList] = useState([
        { noteName : "환자", noteDate: "2024-11-05", noteContent: "2nd note", noteName2 : "봉사자", noteEmail: "", noteEmail2: ""}
    ]);
    const [view, setView] = useState('day');

    
    const handleAddEvent = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setView('day'); // Reset view to day
    };
    //예약 list 작성
    const handleSubmit = async (e) => {
        if (note.trim()) {
            const newNote = {
                noteName : userInfo?.username,
                noteDate: newValue.format('YYYY-MM-DD'),
                noteContent: note,
                noteEmail : userInfo?.email
            };
            console.log('email: ', userInfo?.email, 'name: ', userInfo?.username, ' noteDate: ', newNote.noteDate, 'noteContent', newNote.noteContent)
            try {
                const data = await postCallVolunteer(userInfo?.email, newNote.noteDate, newNote.noteContent);
                console.log('Check response', data)
                /*if (data && data.EC === 0) {
                    setShowModal(false)
                    alert('Updated')
                } else {
                    alert(data.EM || "Something went wrong")
                }*/
            } catch (error) {
                alert("Error occurred")

            }

            setNoteList(prev => [...prev, newNote]);
            setNote("");
            setShowModal(false);

        } else {
            alert("내용을 입력해주세요.");
        }
    };
    //봉사자 기준 받아오기
    const allVolunteerCall = async () => {
        try {
            const data = await postAllVolunteerCall(userInfo?.email);
            console.log('Check response', data);

            // 두 가지 리스트로 데이터를 분리
            const desiredVolunteerDates = data.desiredVolunteerDates.map(item => ({
                noteDate: item.desireddate,
                noteContent: item.text,
                noteName: item.app_user?.name,
                noteEmail: item.userid
            }));

            const volunteerAssignments = data.volunteerAssignments.map(item => ({
                noteDate: item.assignmentdate,
                noteContent: item.text,
                noteName: item.userByUserid?.name, //환자 이름
                noteEmail: item.userByUserid?.userid,
                noteName2: item.userByVolunteerId?.name, //봉사자 이름
                noteEmail2: item.userByVolunteerId?.userid
            }));

            setNoteList(desiredVolunteerDates);
            setSecondNoteList(volunteerAssignments);
            console.log('Transformed typeA data:', desiredVolunteerDates);
            console.log('Transformed typeB data:', volunteerAssignments);

        } catch (error) {
            alert("Error occurred");
        }
    };
    //환자 기준 받아오기
    const userVolunteerCall = async () => {
        try {
            const data = await postUserVolunteerCall(userInfo?.email);
            console.log('Check response', data);

            // 두 가지 리스트로 데이터를 분리
            const desiredVolunteerDates = data.desiredVolunteerDates.map(item => ({
                noteDate: item.desireddate,
                noteContent: item.text,
                noteName: item.app_user?.name,
                noteEmail: item.userid
            }));

            const volunteerAssignments = data.volunteerAssignments.map(item => ({
                noteDate: item.assignmentdate,
                noteContent: item.text,
                noteName: item.userByUserid?.name, //환자 이름
                noteEmail: item.userByUserid?.userid,
                noteName2: item.userByVolunteerId?.name, //봉사자 이름
                noteEmail2: item.userByVolunteerId?.userid
            }));

            setNoteList(desiredVolunteerDates);
            setSecondNoteList(volunteerAssignments);
            console.log('Transformed typeA data:', desiredVolunteerDates);
            console.log('Transformed typeB data:', volunteerAssignments);
            /*if (data && data.EC === 0) {
                setShowModal(false);
                alert('Updated');
            } else {
                alert(data.EM || "Something went wrong");
            }*/
        } catch (error) {
            alert("Error occurred");
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.role && !called) {
            if (userInfo.role === "Patient" || userInfo.role === "user") {
                userVolunteerCall();
            } else {
                allVolunteerCall();
            }
            setCalled(true); // 첫 호출 후에 called를 true로 설정하여 이후 호출 방지
        }
    }, [userInfo.role, called]);



    return (

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
        >
            <div className="container">
                <Row className='g-4'>
                    <Col className='calendar-container border bg-body '>
                        <StaticDatePicker
                            orientation='portrait'
                            openTo={view}
                            value={newValue}
                            onViewChange={(newView) => setView(newView)}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(params) => <input {...params} />}
                            locale={ko}
                            views={['year', 'month', 'day']}
                            format='MM월 DD일'
                            localeText={{
                                toolbarTitle: '날짜 선택',
                                cancelButtonLabel: '취소',
                                todayButtonLabel: '오늘',
                                okButtonLabel: '추가',
                            }}
                            slotProps={{
                                actionBar: {
                                    actions: ['today', 'cancel', 'accept'],
                                    onAccept: handleAddEvent,
                                    onCancel: handleCancel,

                                },
                            }}
                            disablePast
                        />
                    </Col>

                    <Col className='note-container '>
                        <Note
                            noteList={noteList}
                            setNoteList={setNoteList}
                            newValue={newValue}
                            note={note}
                            setNote={setNote}
                            isFirstList={true}
                        />
                    </Col>

                    <Col className='second-note-container'>
                        <Note
                            noteList={secondNoteList}
                            setNoteList={setSecondNoteList}
                            newValue={newValue}
                            note={note}
                            setNote={setNote}
                            isFirstList={false}
                        />
                    </Col>

                </Row>


                <Modal show={showModal} onHide={handleClose} style={{minHeight: '300px'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{newValue.format('YYYY년 MM월 DD일')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{minHeight: '200px'}}>
                        <TextField
                            label="내용을 입력해주세요"
                            fullWidth
                            multiline
                            value={note} type="text"
                            onChange={e => setNote(e.target.value)}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {
                            handleSubmit()
                        }}>추가</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </LocalizationProvider>
    )
}
export default Calendar