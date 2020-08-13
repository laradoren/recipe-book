import React, { useState } from 'react';
import './Recipe.css';
import user from '../../../images/user.png';
import heart from '../../../images/heart.png';
import { NavLink } from 'react-router-dom';


function Comment (props) {
    return (
        <div className="commentCard">
            <div className="commentAuthor">
                <img src={user} alt="user" className="user"/>
                <NavLink to={`/profile/${props.comment.user}`} className="commentUsername">{props.comment.name}</NavLink> 
            </div>
            <div className="commentText">{props.comment.text}</div>
        </div>
    )
};

export default function Recipe (props) {
    const [addMode, setAddMode] = useState(false);
    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('name', localStorage.userName);
        formData.append('text', props.text);
        formData.append('recipe', props.recipe.id);
        formData.append('user', localStorage.userId);
        props.addNewComment(formData);
        setAddMode(false);
    } 
    const onLikeClick = () => {
        props.postLike(props.recipe.id, localStorage.userId);
    }


    return (
            <section className="recipeSection" >
                <div className="container">                        
                    <div className="recipeContent">
                        <h1 className="recipeContentTitle">{props.recipe.title}</h1>
                        <div className="recipeContentColumn">
                            <img src={props.recipe.image} alt="recipeImage" className="recipeSectionContentImage"/> 
                            <div className="recipeContentIngredients"> <b>Інгредієнти:</b> <br/> {props.recipe.ingredients}</div>
                        </div>
                        <div className="recipeContentDescription"> <b>Опис приготування:</b> <br/> {props.recipe.description}</div>  
                        <div className="recipeContentOther">
                            <div className="recipeContentLikes"> <img src={heart} alt="like" className="likeImage" onClick={onLikeClick} />  <div> {props.likes} </div> </div>
                            <div className="recipeContentAuthor">  <b>Автор рецепту: </b> <NavLink to={`/profile/${props.recipe.user_id}`}>{props.recipe.user_name} </NavLink> </div>
                        </div>   
                        <div className="recipeComments">
                            {props.comments.length > 0 
                            ? <>
                                <b>Коментарі: </b>
                                {props.comments.map( c => <Comment key = {c.id} comment={c} /> )}
                            </>
                            : 
                            <>
                                Коментарів до даного рецепту немає, ви можете додати їх першим
                            </> 
                            }
                        
                            <div className="addCommentText" onClick={() => {setAddMode(true)}}>Додати коментар</div>
                            {addMode 
                            ?   <form className="addComment" onSubmit={onFormSubmit}>
                                    <textarea name = "text" type="text" className="addCommentFormField" placeholder="Ввведіть коментар" onChange={onFieldChange} />
                                    <button className="addButton" >Додати</button>
                                </form>
                            : <> </>    }
                    
                        </div>
                    </div>
                </div>
            </section>
    )
};



