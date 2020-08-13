import React from 'react';
import './AddNew.css';

export default function AddNew (props) {
    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData;
        const file = document.querySelector('#image');
        formData.append('title', props.title);
        formData.append('image', file.files[0]);
        formData.append('ingredients', props.ingredients);
        formData.append('description', props.description);
        formData.append('user_id', localStorage.userId);
        formData.append('user_name', localStorage.userName);
        props.addNewRecipe(formData);
        props.history.push('/');
    }
    return (
        <section className="addNewSection">
            <div className="container">
                <form className="addNewContent" onSubmit={onFormSubmit}>
                    <label className="addNewTitle">
                        Заповніть поля, щоб додати новий рецепт
                    </label>
                    <input type="text" name="title" placeholder="Назва рецепту" className="addNewFormInput" onChange={onFieldChange} required />
                    <label htmlFor="image" className="customFileUpload">
                        Завантажте фото
                    </label>
                    <input id="image" name="image" type="file" className="addNewFormFile" onChange={onFieldChange} required />
                    <textarea type="text" name="ingredients" placeholder="Інгредієнти" className="addNewFormInput" onChange={onFieldChange} required />
                    <textarea type="text" name="description" placeholder="Опис приготування" className="addNewFormInput" onChange={onFieldChange} required />
                    <button className="addButton">Додати</button>
                </form>
            </div>            
        </section>
    )
};


