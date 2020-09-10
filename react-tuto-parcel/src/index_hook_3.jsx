import {render} from 'react-dom'
import React, {useState, useEffect} from 'react'
import regeneratorRuntime from "regenerator-runtime";

function useIncrement(initial, step = 1) {
    const [count, setCount] = useState(initial)
    function increment () {
        setCount(count + step)
    }
    return [count, increment]
}

function useToggle(visible = true) {
    const [result, setVisible] = useState(visible)
    function changeVisible () {
        setVisible(result => !result)
    }
    return [result, changeVisible]
}

function useAutoIncrement (initial = 0, step = 1) {
    const [count, setCount] = useState(initial)
    const increment = useEffect(() => {
        const timer = window.setInterval(() => {
            setCount(count => count + 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])
    return count
}

function useFetch(url) {
    const [state, setState] = useState({
        items: [],
        loading: true
    })

    // Lorsque l'élélement est monté, on va chercher les données (asynchrone) avec un useEffect
    useEffect(function () {
        (async function () {
            const response = await fetch(url)
            const responseDATA = await(response.json())
            if (response.ok) {
                setState({
                    items: responseDATA,
                    loading: false
                })
            } else {
                alert(JSON.stringify(responseDATA))
                // setState({
                //     items: [],
                //     loading: false
                // })
                setState(s => ({...s, loading: false}))
            }
        })()
    }, [])

    return [
        state.loading,
        state.items
    ]
}



function Compteur () {

    const [count, increment] = useIncrement(10)

    return <button onClick={increment}>Incrementer : {count}</button>

}

function AutoCompteur () {
    const count = useAutoIncrement(10)

    return <button>Incrementer : {count}</button>
}

function TodoList () {
    // Petit useState afin d'afficher lors de la requette asynchrone chargement lorsque l'on récupère les données
    const [loading, setLoading] = useState(true)
    // On défini un useState avec un resultat dans un premier temps vide
    const [todos, setTodos] = useState([])
    // On va ensuite, lorsque le component est monté de faire un appel AJAX pour récupérer les données
    useEffect(function () {
        // On fait un function asynchrone
        (async function () {
            // On cherche les données
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
            const responseData = await(response.json())
            if (response.ok) {
                // On passe par la fonction callback pour set la nouvelle valeur de todos, initialement vide
                setTodos(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }

            setLoading(false)
        })()
    }, [])

    if (loading) {
        return  <p>Chargement...</p>
    }

    return <ul>
        {todos.map(t => <li key={t.id}>{t.title}</li>)}
    </ul>
}

function PostTable() {
    const [loading, items] = useFetch("https://jsonplaceholder.typicode.com/comments?_limit=100")

    if (loading) {
        return "Chargement..."
    }

    return <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Contenu</th>
            </tr>
        </thead>
        <tbody>
            {items.map(c => <tr key={c.id}><td>{c.name}</td><td>{c.email}</td><td>{c.body}</td></tr>)}
        </tbody>
    </table>
}

function App () {
    const [compteurVisible, toggleCompteur] = useToggle(true)

    return  <div>
        Afficher le compteur
        <input type="checkbox" checked={compteurVisible} onChange={toggleCompteur}/>
        {compteurVisible && <Compteur/>}
        {compteurVisible && <AutoCompteur/>}
        <TodoList/>
        <PostTable/>
    </div>
}

render(
    <App/>,
    document.getElementById('app')
)



// UseMemo sert à mémoriser une valeur pour éviter de faire des traitements particuliers et de refaire des render en boucle (voir chapitre 18).
// Exmeple d'utilisation, lorsque j'ai une composant pure dans un autre composant dont un des etat change, si c'est pas le cas alors le composant pure sera re-rendu.
// UseCallback c'est la même chose avec une syntaxe plus simple

// UseRef permet de stocker une valeur ou de faire une référence d'une valeur du DOM (lorsque l'on ne controle pas directement via react)

// UseLayoutEffect est synchrone, contrairement à UseEffect qui est insynchrone. DONC avec UseEffect, le rendu se ferra avant le contenu de UseEffect, avec UseLayourEffect, cest le contraire
// Du coup il sera interessant d'utiliser UselayoutEffect lorsque l'on veut modifier des valeurs du DOM avant de générer le rendu (par exemple changer un button de couleur lorsque l'on depasse une certaine valeur
