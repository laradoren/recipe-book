import React from 'react';
import './Footer.css';
import github from './../../../images/github.png';
import linkedin from './../../../images/linkedin.png';
import instagram from './../../../images/instagram.png';
import telegram from './../../../images/telegram.png';


export default function Footer() {
    return (
        <section className="footerSection">
            <div className="container">
                <div className="footerContent">
                    <div className="footerText">
                        <div>Аліна Галушко</div>
                        <div>Київ, 2020</div>
                    </div>  
                    <nav className="footerContacts">
                        <a href="https://t.me/lara_doren" className="contact">
                            <img src={telegram} alt="telegram" className="contactImage"/>
                        </a>
                        <a href="https://www.instagram.com/laradoren/" className="contact">
                            <img src={instagram} alt="instagram" className="contactImage"/>
                        </a>
                        <a href="https://www.linkedin.com/in/alina-halushko-295a38176/" className="contact">
                            <img src={linkedin} alt="linkedin" className="contactImage"/>
                        </a>
                        <a href="https://github.com/laradoren" className="contact">
                            <img src={github} alt="github" className="contactImage"/>
                        </a>
                    </nav>                  
                </div>
            </div>            
        </section>
    )
}
