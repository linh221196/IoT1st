
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { Row } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import "./Note.scss"

const Note = ({ note, noteList }) => {

    return (


        <div className="note-card" >
            {noteList.map((item, index) =>
                <Card body className="card-item" style={{ marginBottom: 10 }} key={item.noteDate + index}>
                    <p>{item.noteDate}</p>
                    <p>{item.noteContent}</p>
                </Card>
            )}
        </div>


    )

}

export default Note