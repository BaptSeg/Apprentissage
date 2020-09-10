import {render} from 'react-dom'
import React, {useState, useCallback, useContext, useMemo} from 'react'

const THEMES = {
    dark: {
        background: '#000',
        color: '#FFF'
    },
    light: {
        background: '#FFF',
        color: '#000'
    }
}

// On défini le ThemeContext avec les valeur qui seront envoyé aux enfant (ici un objet)
// Ici ce ThemeContext devra contenir un objet qui aura un theme et une fonction callback, que l'on défini par défaut vide
const ThemeContext = React.createContext({
    theme: THEMES.dark,
    toggleTheme: () => {}
})

function SearchForm() {
    return <div>
        <input/>
        <ThemedButtonClass>Rechercher</ThemedButtonClass>
    </div>
}

function ToolBar() {
    return <div>
        <SearchForm/>
        <ThemedButton>M'inscrire</ThemedButton>
    </div>
}

function ThemedButton ({children}) {
    const {theme} = useContext(ThemeContext)
    return <button style={theme}>{children}</button>
}

class ThemedButtonClass extends React.Component {

    render () {
        const {children} = this.props
        const {theme} = this.context
        return <button style={theme}>{children}</button>
    }
}
ThemedButtonClass.contextType = ThemeContext

// LAVANTAGE DUTILISER LA METHODE AVEC LA FUNCTION CEST QUE LON PEUT AVOIR PLUTOT USECONTEXT, ALORS QUAVEC LA CLASSE ON PEUT ATTRIBUER QUUN CONTEXTTYPE

function ThemeSwitcher () {
    // Pour utiliser les valeurs envoyé par le parent, il faut utiliser la hook useContext
    const {toggleTheme} = useContext(ThemeContext)
    return <button onClick={toggleTheme}>Changer de theme</button>
}




function App () {

    const [theme, setTheme] = useState('light')
    const toggleTheme = useCallback(function () {
        setTheme(t => t === 'light' ? 'dark' : 'light')
    }, [])

    // Voila ce que nous allons envoyé au enfant ; un objet contenant : un theme ==> En fonction de l'état theme, et une fonction callback pour modifier le theme ==> toggleTheme
    // Ce mémo changera de valeur lorsque theme ou toggleTheme change de valeur
    const value = useMemo(function () {
        return {
            theme: theme === 'light' ? THEMES.light : THEMES.dark,
            toggleTheme
        }
    }, [toggleTheme, theme])

    // Ici on n'oublie pas d'encadrer nos enfant pas <ThemeContext.provider> et d'envoyer aux enfant value (l'objet qui contient les informations)
    return <div>
        <ThemeContext.Provider value={value}>
            <ToolBar/>
            <ThemeSwitcher/>
        </ThemeContext.Provider>
    </div>
}

render(
    <div>
        <App/>
    </div>,
    document.getElementById('app')
)