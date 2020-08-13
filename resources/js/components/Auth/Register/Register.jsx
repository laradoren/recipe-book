import React from 'react';
import './../Auth.css';

export default function Register (props) {

    const onFieldChange = (e) => {
        props.setFields(e.target.name, e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        let formDate = new FormData();
        formDate.append('name', props.name);
        formDate.append('email', props.email);
        formDate.append('password', props.password);
        props.register(formDate);        
    }; 

    if(props.isSuccessRegister === true) {
        props.history.push('/login');              
    }

    return (
        <section className="authSection">
            <div className="container">
                <form className="authContent" onSubmit={onFormSubmit}>
                    <label className="authTitle">
                        Введіть, будь ласка, дані для реєстрації
                    </label>
                    <input type="text" required 
                           name="name" placeholder="Ім'я" 
                           className="authFormInput" onChange={onFieldChange} />

                    <input type="email"  name="email" required
                           placeholder="Електронна пошта" className="authFormInput" 
                           onChange={onFieldChange} />

                    <input type="password" required
                           name="password" placeholder="Пароль" 
                           className="authFormInput" onChange={onFieldChange} />

                    <button className="authButton">Зареєструватися</button>
                </form>
            </div>            
        </section>
    )
};

