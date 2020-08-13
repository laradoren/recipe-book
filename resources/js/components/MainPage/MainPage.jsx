import React  from 'react';
import './MainPage.css';
import { NavLink } from 'react-router-dom';

const RecipeCard = ({image, title, id}) => {
    return ( 
            <NavLink to={`/recipe/${id}`} className="recipeCard" >                        
                <div className="recipeCardContent">
                    <div className="recipeContentImage">
                        <img src={image} alt="recipeImage" className="recipeImage"/>
                    </div>                            
                    <div className="recipeCardContentTitle">{title}</div>
                </div>
            </NavLink>
    )
}

export default function MainPage (props) {
    return (
        <section className="mainPageSection">
            <div className="container">
                <div className="mainPageTitle">
                    Ласкаво просимо на сайт рецептів <br/>
                    Чудові рецепти на кожен день
                </div>
                <div className="mainPageContent">
                    {props.recipes.map( r => <RecipeCard key={r.id} id = {r.id} image = {r.image} title = {r.title} />)}   
                </div>
            </div>            
        </section>
    )
};


