import {render} from 'react-dom'
import React, {useState, useCallback, useContext, useMemo, createContext} from 'react'

const FormContextContext = createContext({})

function FormContext ({defaultValue, onSubmit, children}) {

    // On a besoin d'enregistrer un état des valeurs
    const [data, setData] = useState(defaultValue)

    return <FormContextContext.Provider value={data}>
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </FormContextContext.Provider>
}

function FormField ({name, children}) {

    const data = useContext(FormContextContext)

    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input className="form-control" type="text" name={name} id={name} value={data[name] || ''}/>
    </div>
}

function PrimaryButton ({children}) {
    return <button className="btn btn-primary">{children}</button>
}

function App () {
    const handleSubmit = useCallback(function (value) {
        console.log(value)
    }, [])


    return <FormContext defaultValue={{name: 'Doe', firstname: 'John'}} onSubmit={handleSubmit}>
        <FormField name="name">Nom</FormField>
        <FormField name="firstname">Prénom</FormField>
        <PrimaryButton>Envoyer</PrimaryButton>
    </FormContext>
}



render(
    <div>
        <App/>
    </div>,
    document.getElementById('app')
)