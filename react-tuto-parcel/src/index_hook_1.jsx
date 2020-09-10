import {render} from 'react-dom'
import React, {useState} from 'react'

function Compteur () {
    const [count, setState] = useState(0)
    // La fonction useSTate renvoie un tableau à 2 champs (la valeur du state et la fonction callback qui va servir à modifier la valeur de state)

    function handleClick (e) {
        setState(count + 1)
    }

    return <button onClick={handleClick}>{count}</button>
}

function Compteur_obj () {
    const [state, setState] = useState({
        a: 5
    })

    function handleClick(e) {
        e.preventDefault()
        setState({
            count: 10,
            count2: 100
        })
        // setState(state => {
        //     return {...state, count: 10}
        // })

        // Cette methode écrase les anciennes valeur, donc si l'on souhaite conserver certaines valeurs il faut le spécifier
        // Ou faire la deuxième mathode
    }

    return <button onClick={handleClick}>{JSON.stringify(state)}</button>
}

function useIncrement(initial, step) {
    const [count, setCount] = useState(initial)
    const increment = () => {
        setCount(count => count + step)
    }
    return [count, increment]
}

function Compteur_perso () {
    const [count, increment] = useIncrement(0,2)

    return <button onClick={increment}>Valeur : {count}</button>
}

render(
    <div>
        <Compteur_perso/>
    </div>,
        document.getElementById('app')
)