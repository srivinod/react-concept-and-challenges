import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';


const Header = () => {

    const {theme, toggleTheme} = useContext(ThemeContext)

    return (
        <header >
            <button onClick = {toggleTheme} >{theme}</button>
        </header>
    )
}