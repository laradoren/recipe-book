import React, { useState } from 'react';
import './MyContent.css';
import { NavLink } from 'react-router-dom';

const RecipeModal = (props) => {
    const onFormSubmit = (e) => {
        e.preventDefault();
        const body = new FormData();
        const file = document.querySelector('#image');
        body.append('title', props.title ? props.title : props.recipe.title);
        body.append('image', file.files[0] ? file.files[0] : props.recipe.image);
        body.append('description', props.description ? props.description : props.recipe.description);
        body.append('ingredients', props.ingredients ? props.ingredients : props.recipe.ingredients);
        body.append("_method", "PUT");
        props.updateRecipe(props.recipe.id, body);
        props.setOpenModalWindow(false);
    };

    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    };

    return (  
        <div className="modalOverlay" >
            <div className="recipeModalWindow">                       
                <form className="addNewContent" onSubmit={onFormSubmit}>
                    <label className="recipeModalTitle">
                        Заповніть поля, щоб змінити щось у рецепті
                    </label>
                    <input type="text" name="title" placeholder="Назва рецепту" className="addNewFormInput"  onChange={onFieldChange}  />
                    <label htmlFor="image" className="customFileUpload">
                        Завантажте фото
                    </label>
                    <input type="file"  id="image" name="image"  onChange={onFieldChange}  className="addNewFormFile"  />
                    <textarea type="text" name="ingredients" placeholder="Інгредієнти" className="addNewFormInput" onChange={onFieldChange}  />
                    <textarea type="text" name="description" placeholder="Опис приготування" className="addNewFormInput" onChange={onFieldChange}  /> 
                    <div className="profileAlertButtons">
                        <button  onClick={() => props.setOpenModalWindow(false)} className="deleteButton space">&#10008;</button>
                        <button className="editButton space">&#10004;</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function MyRecipe (props) {
    const [openModalWindow, setOpenModalWindow] = useState(false);

    const onDeleteClick = () => {
        props.deleteRecipe(props.recipe.id);
    };    
    return (
        <>
            <div className="myRecipeCard">                        
                <div className="myRecipeCardContent">
                    <img src={props.recipe.image} alt="r" className="myRecipeContentImage"/>
                    <NavLink to={`/recipe/${props.recipe.id}`} className="myRecipeCardContentTitle">{props.recipe.title}</NavLink>
                    <div className="myContentButtons">
                        <button onClick = {() => {setOpenModalWindow(true)}} className="editButton">Змінити</button>
                        <button onClick={onDeleteClick} className="deleteButton">Видалити</button>
                    </div>
                </div>
            </div>
            {openModalWindow && <RecipeModal setOpenModalWindow = {setOpenModalWindow} setFields={props.setFields} 
                                             recipe={props.recipe} updateRecipe={props.updateRecipe}
                                             image={props.image}  ingredients={props.ingredients}  
                                             title={props.title} description={props.description} />}
        </>
    )
}