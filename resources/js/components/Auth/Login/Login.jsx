import React from 'react';
import './../Auth.css';

export default function Login (props) {

    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formDate = new FormData();
        formDate.append('email', props.email);
        formDate.append('password', props.password);
        props.login(formDate);                 
    };   
    
    if(props.isSuccessLogin  === true ) {
        props.history.push('/');
    }

    return (
        <section className="authSection">
            <div className="container">
            <form className="authContent" onSubmit = {onFormSubmit}>
                    <label className="authTitle">
                        Введіть ваші дані для авторизації
                    </label>
                    <input type="email" required
                           name="email" placeholder="Електронна пошта" 
                           className="authFormInput"  onChange={onFieldChange} />

                    <input type="password" required
                           name="password" placeholder="Пароль" 
                           className="authFormInput"  onChange={onFieldChange} />
                    <button className="authButton">Увійти</button>
                </form>
            </div>            
        </section>
    )
};