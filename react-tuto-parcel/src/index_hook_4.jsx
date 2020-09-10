import {render} from 'react-dom'
import React, {useState, useEffect, useReducer} from 'react'

/**
 * Sert à initialiser l'état
 * @param La valeur initiale
 */
function init (initialValue) {
    return {count: initialValue}
}

/**
 * Cette fonction sert à réaliser des traitements en fonction des types d'action
 * @param state Ce sont les données
 * @param action L'action que l'on souhaite réaliser
 */
function reducer (state, action) {
    // On va faire un switch afin de traiter les différents types d'action
    switch(action.type) {
        case 'incrementer':
            return {count: state.count + 1}
        case 'decrementer':
            if (state.count > 0) {
                return {count: state.count - 1}
            }
        case 'reset':
            return init(0)
        default:
            throw new Error("L'action" + action.type + " est inconnue")
    }
}

function App () {

    /**
     * On défini un useReducer, il prend trois paramètre, le premier c'est le fonction reducer qui va servire a faire des traitement différent en fonction du type de l'acion
     * Deuxième paramètre : la valeur inital
     * Troisième paramètre, un fonction d'initialisation (facultative)
     *
     * Ce que l'on va récupérer c'est un tableau avec l'état (ici count) et la fonction à appeler pour changer l'état ==> Un peu comme useState
     *
     * NB : UseReducer ne fais pas de rendu (render) si la valeur de count de change pas
     */
    const [count, dispatch] = useReducer(reducer, 0, init)

    return <div>
        Compteur : {JSON.stringify(count)}
        <button onClick={() => dispatch({type: 'incrementer'})}>Incrémenter</button>
        <button onClick={() => dispatch({type: 'decrementer'})}>Décrémenter</button>
        <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
    </div>
}


render(
    <App/>,
    document.getElementById('app')
)




/**
 *  RECAPITULATIF DES HOOKS : https://fr.reactjs.org/docs/hooks-reference.html
 *
 *
 *  UseState : Va permettre de définir un état local, on lui passe en paramètre 1 la valeur initial, ca nous rend un tableau de taille 2 [l'etat, une fonction qui nous sert à muter cet état la]
 *  A chaque fois que l'état est muter, le composant est re-rendu
 *  const [state, setState] = useState(initialState);
 *
 *
 *  UseRéducer : Va permettre de défiir un état local avec la possibilité d'avoir une fonction de reduction qui va permettre de définir des changements d'état plus complexes
 *  reducer ==> Function qui sert à muter l'état
 *  initialArg ==> La valeur initial
 *  init ==> Function d'initialisation de l'état (facultative)
 *  dispatch ==> nom de la function à appeler avec en paramètre le type d'action afin de muter l'état
 *  const [state, dispatch] = useReducer(reducer, initialArg, init);
 *
 *
 *  useEffect : Permet de réaliser des comportement asynchrone par rapport au DOM lorsqu'un état va changer ou tout simplement lorsqu'un composant sera monté <==> ComponentDidMount
 *  NB : Il ne faut pas oublier de return une fonction qui va détruire les variables potentiellements créer au montage du composant <==> ComponentWillUnmount
 *
 *
 *  useLayoutEffect : Pareil que useEffect mais de manière synchrone (avant que le DOM soit rendu).
 *
 *
 *  useMemo / useCallBack : Permet de la mémorisation et de garder en mémoire certaines données.
 *  Exemple : lorsque j'ai une composant pure dans un autre composant dont un des etat change, si c'est pas le cas alors le composant pure sera re-rendu.
 *
 *
 *  useRef : Permet de stocker une valeur ou de faire une référence d'une valeur du DOM (lorsque l'on ne controle pas directement via react)
 *
 */
