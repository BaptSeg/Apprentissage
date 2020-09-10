import {render} from 'react-dom'
import React, {useState, useEffect} from 'react'

function useIncrement(initial, step) {
    const [count, setCount] = useState(initial)
    const increment = () => {
        setCount(count => count + step)
    }
    return [count, increment]
}

function Compteur_perso() {
    const [count, increment] = useIncrement(0,2)

    useEffect(() => {       // Si l'on défini un useEffet avec un tableau vide en paramètre, alors il est <==> à un ComponentDidMount
        const timer = window.setInterval(() => {
            increment()
        }, 500)

        return () => {          // Cette fonction est une fonction qui sera appelé si le Component Compteur_perso disparait (avec un nouveau render par exmeple)
            clearInterval(timer)        // Ainsi il ne faut pas oublier de clear les variables que l'on aurait pu définir sinon ==> probléme de logique
        }
    }, [])      // En deuxième paramètre on indique un tableau avec les valeurs que l'on souhaite écouter, ici vide

    useEffect(() => {
        document.title = "Compteur :" + count
    }, [count])

    return <button onClick={increment}>Valeur : {count}</button>
}

render(
    <div>
        <Compteur_perso/>
    </div>,
    document.getElementById('app')
)