import React from 'react';
import { createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

const [theme, setTheme] = useState('light');

const toggleTheme = () => {
    setTheme('dark')
}

return (
<ThemeContext.Provider value = {{theme,toggleTheme}}>
    {children}
</ThemeContext.Provider>

)

}


