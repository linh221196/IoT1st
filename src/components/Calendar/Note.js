
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card';
import "./Note.scss"
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Note = ({ noteList, setNoteList }) => {
    const handleEdit = () => {

    }

    const handleDelete = (index) => {
        setNoteList(prev => prev.filter((_, i) => i !== index))
    }


    return (


        <div className="note-card" >

            {noteList.map((item, index) =>
                <Card body className="card-item" style={{ marginBottom: 10 }} key={item.noteDate + index}>
                    <Row>
                        <Col sm={8}>
                            <p>{item.noteDate}</p>
                        </Col>
                        <Col>
                            <Button variant="success"

                            ><MdEdit size={20} /></Button>
                            <Button variant="danger"
                                onClick={() => handleDelete(index)}
                            ><MdDeleteForever size={20} /></Button>
                        </Col>
                    </Row>

                    <p>{item.noteContent}</p>
                </Card>
            )}
        </div>


    )

}

export default Note