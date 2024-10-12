
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { Row } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import "./Note.scss"

const Note = ({ note, noteList }) => {

    return (
        <div className="noteContent-container">

            <div className="noteCard-container">
                <div className="note-card" >
                    {noteList.map(item =>
                        <Card body className="card-item" style={{ marginBottom: 10 }} >
                            <p>{item.noteDate}</p>
                            <p>{item.noteContent}</p>
                        </Card>
                    )}
                </div>
            </div>






        </div>
    )

}

export default Note