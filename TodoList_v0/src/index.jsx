import {render} from 'react-dom'
import React, {useState} from 'react'

/**
 * Hook personnalisé
 */
function useStateTask(initial = {}) {
    const [taches, setTaches] = useState(sortTasks(initial))
    const TaskChangement = (les_taches) => {
        const les_taches_triees = sortTasks(les_taches)
        setTaches(les_taches_triees)
    }

    // La fonction de trie des taches (tri sur la position)
    function sortTasks(taches) {
        return taches.sort(function(a,b) {
            return a.position - b.position
        })
    }

    return [taches, TaskChangement]
}


 /**
  * FOnction composants
  */
function Task ({id, title, handleDelete, handleModify, handleChangePosition}) {

    const [inModify, setInModify] = useState(false)
    const [changement, setChangement] = useState(title)

    // Si on double click sur une tâche, on set son inModify a true (cette tâche est en modification)
    function handleClickToChangement () {
        setInModify(true)
    }

    // Si on valide la modification (en appuyant du entrée), alors la modification est validée
    function handleValideChangement (e) {
        if (e.key === 'Enter') {
            handleModify(id, e.target.value)
            setInModify(false)            
        } else if (e.keyCode === 27) {
            setInModify(false)
        }
    }

    // Handler qui permet de suivre le changement de nom et de le mettre à jour
    function handleChangement (e) {
        setChangement(e.target.value)
    }

    // Si on click sur la croix alors on appele le callback passé en paramètre, qui envoie sur la function removeTache()
    function handleCLick () {
        handleDelete(id)
    }

    function handleUp () {
        handleChangePosition(true, id)
    }

    function handleDown() {
        handleChangePosition(false, id)
    }

    return <ul className="list-group offset-md-3 col-md-6" on>
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {inModify ? 
                <input className="form-control" type="text" onChange={handleChangement} onKeyDown={handleValideChangement} value={changement}></input> : 
                <span onDoubleClick={handleClickToChangement}>{title}</span>
            }
            <div>
                <span onClick={handleUp} className="badge badge-info badge-pill mr-1">↑</span>
                <span onClick={handleDown} className="badge badge-primary badge-pill mr-1">↓</span>
                <span onClick={handleCLick} className="badge badge-danger badge-pill">X</span>
            </div>
        </li>
    </ul>
}

function TaskInput ({handleAdd}) {

    const [name, setName] = useState('')

    function handleChange (e) {
        setName(e.target.value)
    }

    function handleEnter (e) {
        if (e.key === 'Enter') {
            handleAdd(name)
            setName('')
        }
    }

    function handleClick (e) {
        if (name !== '') {
            handleAdd(name)
            setName('')
        }
    }

    return <div className="form-group offset-md-4 col-md-4 mt-5 text-center">
        <label htmlFor="name">Entrer le nom de votre tâche</label>
        <input className="form-control" type="text" id="name" name="name" value={name} onChange={handleChange} onKeyDown={handleEnter}></input>
        <button className="btn btn-primary mt-3 mb-3" onClick={handleClick} onKeyDown={handleClick}>Ajouter ma tâche</button>
    </div>
}

function ButtonSuppAll ({handleDeleteAll}) {

    function handleClick() {
        handleDeleteAll()
    }

    return <div className="text-center mt-3">
        <button className="btn btn-danger" onClick={handleClick}>Supprimer toutes les taches</button>
    </div>
}

function TaskStore () {

    const [taches, setTaches] = useStateTask([
        {id: 1, position: 1, title:"Faire mes courses"},
        {id: 2, position: 2, title:"Faire une lessive"}, 
        {id: 3, position: 3, title:"Préparer le repas"},
        {id: 4, position: 4, title:"Faire les devoirs"},
        {id: 5, position: 5, title:"Promener le chien"}, 
        {id: 6, position: 6, title:"Faire le ménage"}
    ])

    function addTaches(title) {
        const tache = {
            id: taches.length + 1,
            position: taches.length + 1, 
            title: title
        }
        setTaches([...taches, tache])
    }

    function removeTache(id) {
        setTaches(taches.filter(t => t.id !== id))
    }

    function removeAll() {
        setTaches([])
    }

    function modifyTache(id, new_title) {
        const new_taches = taches.map(t => t.id === id ? {title: new_title, id: id} : t)
        setTaches(new_taches)
    }

    function modifyPosition(up, id) {
        console.log(up)
        if (up && id !== 1) {
            const new_taches = taches.map(function(t) {
                const tid = t.id
                const ttitle = t.title
                const tposition = t.position
                if (t.id === id) {
                    return {id: tid, position: tposition-1, title: ttitle}
                } else if (t.id === id - 1) {
                    return {id: tid, position: tposition+1, title: ttitle}
                } else {
                    return {id: tid, position: tposition, title: ttitle}
                }
            })
            console.log(new_taches)
            setTaches(new_taches)
        }
    }

    return <div>
        <TaskInput handleAdd={addTaches}></TaskInput>
        {taches.map(t => <Task key={t.id} id={t.id} title={t.title} handleDelete={removeTache} handleModify={modifyTache} handleChangePosition={modifyPosition}></Task>)}
        {taches.length > 0 ? <ButtonSuppAll handleDeleteAll={removeAll}/> : null}
        {console.log(taches)}
    </div>

}

render(
    <div>
        <TaskStore/>
    </div>,
    document.getElementById('app')
)