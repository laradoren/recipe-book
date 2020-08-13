import React, { useState } from 'react';
import './MyContent.css';

const CommentModal = (props) => {
    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const body = new FormData();
        body.append('text', props.text ? props.text : props.comment.text);
        body.append("_method", "PUT");
        props.updateComment(props.comment.id, body);
        props.setOpenModalWindow(false);
    };

    return (
        <div className="modalOverlay" >
            <div className="commentModalWindow">                       
                <form className="addNewContent" onSubmit={onFormSubmit}>
                    <label className="recipeModalTitle">
                        Заповніть поля, щоб змінити щось у коментарі
                    </label>
                    <textarea type="text" name="text" placeholder="Текст коментару" className="addNewFormInput" onChange={onFieldChange} />
                    <div className="profileAlertButtons">
                        <button  onClick={() => props.setOpenModalWindow(false)} className="deleteButton space">&#10008;</button>
                        <button className="editButton space">&#10004;</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function MyComment (props) {
    const onDeleteClick = () => {
        props.deleteComment(props.comment.id);
    }
    const [openModalWindow, setOpenModalWindow] = useState(false);
    return (
        <>
            <div className="myCommentCard">                        
                <div className="myCommentCardContent">                         
                    <div className="myCommentCardContentText">{props.comment.text}</div>
                    <div className="myCommentCardContentDate">{props.comment.created_at.slice(0, 10)}</div>
                    <div className="myContentButtons commentButton">
                        <button onClick = {() => {setOpenModalWindow(true)}} className="editButton">Змінити</button>
                        <button onClick={onDeleteClick} className="deleteButton">Видалити</button>
                    </div>
                </div>
            </div>
            {openModalWindow && <CommentModal setOpenModalWindow = {setOpenModalWindow} setFields={props.setFields} 
                                             comment={props.comment} updateComment={props.updateComment}
                                             text = {props.text} />}
        </>
    )
}