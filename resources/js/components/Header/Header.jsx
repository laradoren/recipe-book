import React, { useState } from 'react';
import './Header.css';
import logo from './../../../images/logoBlack.png';
import menu from './../../../images/menu.png';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
    const [menuMode, setMenuMode] = useState(false);
    let mobileClass = menuMode ? "headerBurgerMenu" : "none";
    const logOut = (e) => {
        //log out - go to main page and reload
        e.preventDefault();
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        props.history.push('/');
        props.setToken(null);
    };
    
    return (
        <section className="headerSection">
            <div className="container">
                <div className="headerContent">
                    <NavLink to='/' className="headerImage">
                        <img src={logo} alt="logo" className="logo"/>
                        Книга рецептів
                    </NavLink> 
                    <nav className="headerMenu">
                        { props.token 
                        ? <>
                            <NavLink to={`/profile/${localStorage.userId}`} className="headerItem">Мій профіль</NavLink>
                            <NavLink to='/mycontent' className="headerItem">Мною додані</NavLink>
                            <NavLink to='/addnew' className="headerItem">Додати рецепт</NavLink> 
                            <NavLink to="#" className="headerItem" onClick={logOut}>Вийти</NavLink> 
                        </>
                        : <>
                            <NavLink to='login' className="headerItem">Авторизація</NavLink>
                            <NavLink to='register' className="headerItem">Реєстрація</NavLink> 
                        </>}
                        
                    </nav>
                    <div className="mobileMenu">
                        <img src={menu} alt="menu" className="menu"  onClick={() => {setMenuMode(true)}}  />
                        <nav className={mobileClass} onClick={() => {setMenuMode(false)}}>
                            
                            {props.token
                            ? <>
                                <NavLink to={`/profile/${localStorage.userId}`} className="headerItem">Мій профіль</NavLink>
                                <NavLink to='/mycontent' className="headerItem">Мною додані</NavLink>
                                <NavLink to='/addnew' className="headerItem">Додати рецепт</NavLink>
                                <NavLink to="#" className="headerItem" onClick={logOut}>Вийти</NavLink> 
                            </>
                            : <>
                                <NavLink to='/login' className="headerItem">Авторизація</NavLink>
                                <NavLink to='/register' className="headerItem">Реєстрація</NavLink> 
                            </>}
                        </nav>
                    </div>
                    
                </div>
            </div>            
        </section>
    )
}
