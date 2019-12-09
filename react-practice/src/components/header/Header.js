/**
 *  Header component of App.js
 */
import React from 'react';
import './Header.scss';
import Logo from './Logo';
import NameOfSite from './NameOfSite';

function Header(){
    return(
        <div className = "headerContent">
            <Logo />
            <NameOfSite />
        </div>
    )
}

export default Header