import {render} from 'react-dom'
import React, {useState} from 'react'






function Task ({id, title, handleDelete, handleModify}) {

    const [inModify, setInModify] = useState(false)
    const [changement, setChangement] = useState(title)

    function handleClickToChangement () {
        setInModify(true)
    }

    function handleValideChangement (e) {
        if (e.key === 'Enter') {
            handleModify(id, e.target.value)
            setInModify(false)            
        } else if (e.keyCode === 27) {
            setInModify(false)
        }
    }

    function handleChangement (e) {
        setChangement(e.target.value)
    }

    function handleCLick () {
        handleDelete(id)
    }

    return <ul className="list-group offset-md-3 col-md-6">
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {inModify ? 
                <input className="form-control" type="text" onChange={handleChangement} onKeyDown={handleValideChangement} value={changement}></input> : 
                <span onDoubleClick={handleClickToChangement}>{title}</span>
            }
            <span onClick={handleCLick} className="badge badge-danger badge-pill">X</span>
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

    const [taches, setTaches] = useState([{id: 1, title: "Faire l'amour à mon bébé"}, {id: 2, title:"Dormir avec mon bébé"}, {id: 3, title:"Faire des bisoux à mon bébé"}])

    function addTaches(title) {
        const tache = {
            id: taches.length + 1, 
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

    return <div>
        <TaskInput handleAdd={addTaches}></TaskInput>
        {taches.map(t => <Task key={t.id} id={t.id} title={t.title} handleDelete={removeTache} handleModify={modifyTache}></Task>)}
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