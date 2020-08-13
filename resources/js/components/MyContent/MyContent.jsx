import React from 'react';
import './MyContent.css';
import MyRecipe from './MyRecipe';
import MyComment from './MyComment';

export default function MyContent (props) {
    return (
        <section className="myContentSection">
            <div className="container">
                <div className="myContentTitle">
                    Тут ви можете взаємодіяти із інформацією, що була додана вами
                </div>
                <div className="myContentContent">
                    <div className="myContentSubtitle">Додані вами рецепти: </div>
                    {props.recipes.length > 0 
                    ? props.recipes.map( r => <MyRecipe key={r.id} setFields={props.setFields} recipe={r}
                                                        deleteRecipe = {props.deleteRecipe} updateRecipe={props.updateRecipe} 
                                                        title={props.title} image={props.image} ingredients={props.ingredients}  
                                                        description={props.description} text={props.text}  /> )
                    : " Ви не додавали рецептів "}
                    <div className="myContentSubtitle">Додані вами коментарі: </div>
                    {props.comments.length > 0 
                    ? props.comments.map( c => <MyComment  key = {c.id}  setFields={props.setFields} comment = {c} text = {props.text}
                                                           deleteComment = {props.deleteComment} updateComment={props.updateComment}  /> )
                    : " Ви не додавали коментарів "}
                </div>
            </div>            
        </section>
    )
};


