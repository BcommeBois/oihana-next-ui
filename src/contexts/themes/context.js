import { createContext } from 'react' ;

const ThemesContext = createContext
({
    isDark       : false ,
    toggleIsDark : () => {}
} );

ThemesContext.displayName = 'ThemeContext' ;

export default ThemesContext ;