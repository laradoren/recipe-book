import React, { useState } from 'react';
import user from './../../../images/user.png';
import './Profile.css';
import { NavLink } from 'react-router-dom';

const Comment = (props) => {
    return (
        <div className="profileCommentCard">
            <div className="profileCommentText">{props.comment.text}</div>   
            <NavLink to={`/profile/${props.comment.user}`} className="profileCommentAuthor">{props.comment.name}</NavLink>          
        </div>
    );

};

const Recipe = (props) => {
    const requestComment = () => {
        props.requestProfileComments(props.recipe.id);
        props.setShowComments(props.recipe.id);
    }
    return (
        <div className="profileRecipeCard">
            <div className="profileRecipeHeader">
                <img src={props.recipe.image} alt="" className="profileRecipeCardImage"/>
                <NavLink to={`/recipe/${props.recipe.id}`} className="profileCardTitle">{props.recipe.title} </NavLink>
                <div className="profileCardLikes"> Сподобалось: {props.recipe.likes} людям </div>
            </div>
            <div className="profileRecipeCardContentTitle"> 
            {props.showComments == props.recipe.id
                ? <div onClick={() => props.setShowComments(0)}>Приховати коментарі</div>
                : <div onClick={requestComment}> Показати коментарі</div>  
            } </div>

            { props.showComments == props.recipe.id  && <div className="profileRecipeCardContent">
                {props.comments.map( c => <Comment key={c.id} comment = {c}  /> )}
                                </div> }           
        </div>
    );

};

export const Profile = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [showComments, setShowComments] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const file = document.querySelector('#image');
        if(file.files[0]) {
            formData.append('image', file.files[0]);
        }
        formData.append('status', props.status ? props.status : props.profile.status);
        formData.append('about', props.about ? props.about : props.profile.about);
        formData.append("_method", "PUT");
        props.updateProfile(props.profile.id, formData);
        setEditMode(false);
    }
    const onDeleteClick = () => {
        props.deleteProfile(props.profile.id);
        setShowAlert(false);
        localStorage.removeItem('userToken');
        localStorage.removeItem('successLogin');
        localStorage.removeItem('userId');
        props.history.push('/');
        window.location.reload();
    }
    return (
        <section className="profileSection">
            <div className="container">
                <div className="profileTitle">Ласкаво просимо до вашого особистого кабінету</div>
                <div className="profileContent">
                {!editMode 
                ? <div className="profileInfo">
                    <div className="profilePhoto">
                        {props.profile.image
                            ? <img src={props.profile.image} alt="image" className="profileUserPhoto"/> 
                            : <img src={user} alt="image" className="profileUserPhoto"/>
                        }
                    </div>
                    <div className="profileInfoItem">
                            {props.profile.name
                            ? <div><b>Нікнейм: </b>{props.profile.name}</div>
                            : <div>error</div>}
                    </div>
                    <div className="profileInfoItem">
                            {props.profile.status
                            ? <div><b>Статус: </b>{props.profile.status}</div>
                            : <div>Немає статусу</div>}
                    </div>
                    <div className="profileInfoItem">
                        {props.profile.about
                        ? <div><b>Про себе: </b>{props.profile.about}</div>
                        : <div>Ви ще не додали інформацію про себе</div>}
                    </div>
                    <div className="profileInfoItem">
                        {props.profile.created_at
                        ? <div><b>Зареєстровані на сайті з:</b> {props.profile.created_at.slice(0, 10)}</div>
                        : <></>}
                    </div>
                    <div className="profileInfoItem">
                        {props.recipes.length
                        ? <div><b>За цей час додано рецептів:</b> {props.recipes.length}</div>
                        : <>Не додавали рецептів</>}
                    </div>
                    {localStorage.userId == props.profile.id 
                        ? <>
                            <button className="editButton space" onClick={() => {setEditMode(true)}}>Змінити профіль</button>
                            <button className="deleteButton space" onClick={() => {setShowAlert(true)}}>Видалити профіль</button>
                        </>
                        : <> </>
                    }
                    
                    { showAlert && <div className="modalOverlay">
                        <div className="alertWindow">
                            <div className="alertTitle">Ви справді хочете видалити свій профіль, а також всі свої додані дані?</div>
                            <div className="profileAlertButtons">
                                <button className="editButton space" onClick={() => {setShowAlert(false)}}>&#10008;</button>
                                <button className="deleteButton space" onClick={onDeleteClick}>&#10004;</button>
                            </div>
                        </div>
                    </div>}
                  </div>
                : <form className="profileFormChange" onSubmit = {onFormSubmit}>
                    <label className="addNewTitle">
                        Заповніть поля, які потрібно змінити
                    </label>
                    <label htmlFor="image" className="customFileUpload">
                        Завантажте фото
                    </label>
                    <input id="image" name="image" type="file" className="addNewFormFile" onChange={onFieldChange}/>
                    <input type="text" name="status" id="status" className="addNewFormInput" onChange={onFieldChange} placeholder="Введіть статус"/>
                    <textarea name="about" id="about" onChange={onFieldChange} required className="addNewFormInput" placeholder="Введіть щось про себе"></textarea>
                    <button className="editButton space" >Зберегти</button>
                    <button className="deleteButton space" onClick={() => {setEditMode(false)}} >Скасувати</button>
                  </form>
                }
                <div className="profileRecipeContent">
                    {props.recipes.map( r => <Recipe key = {r.id} recipe = {r} requestProfileComments={props.requestProfileComments} 
                                                     comments={props.comments} showComments = {showComments} setShowComments={setShowComments} /> )}
                </div>
            </div>
            </div>
        </section>
    );
};
