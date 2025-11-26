import React from 'react';
import { ThemeProvider } from './ThemeContext';
import {Header} from './Header';

export default function App(){
    
    return(
        <ThemeProvider>
            <Header/>
        </ThemeProvider>
    )
}