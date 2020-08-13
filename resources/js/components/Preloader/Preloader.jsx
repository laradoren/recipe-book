import React from 'react';
import preloader from './../../../images/preloader.gif';
import './Preloader.css';

export default function Preloader () {
    return (
        <div className="preloader">  
            <img src={preloader} alt="preloader" className="preloaderImage"/>         
        </div>
    )
};