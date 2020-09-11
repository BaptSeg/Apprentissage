import {render} from 'react-dom'
import React, {useState, useCallback} from 'react'

function Task ({id, title, priority, handleDelete, handleModify, handleConsultTache, consulting}) {

    // Définition des hooks utilisés
    const [inModify, setInModify] = useState(false)
    const [changement, setChangement] = useState(title)

    // Si on double click sur une tâche, on set son inModify a true (cette tâche est en modification)
    function handleClickToChangement () {
        setInModify(true)
    }

    // Si on valide la modification (en appuyant sur entrée), alors la modification est validée
    function handleValideChangement (e) {
        if (e.key === 'Enter') {
            handleModify(id, priority, e.target.value)
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

    // Si on double click sur un tache, on appelle le callback passé en paramètre qui envoyé l'information à TaskStore
    function handleOpenInfosOfTask () {
        handleConsultTache({consult: true, id: id})
    }

    return <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center" style={ consulting ? {borderColor:'blue'} : null}>
            {inModify ?
                <input style={{width: "300px"}} className="form-control" type="text" onChange={handleChangement} onKeyDown={handleValideChangement} value={changement}></input> :
                <span onDoubleClick={handleClickToChangement}>{title}</span>
            }
            <div className="d-flex flex-row">
                <span className="badge badge-light badge-pill mr-1 pt-1">{priority}</span>
                <button onClick={handleCLick} className="badge badge-danger badge-pill mr-1">X</button>
                <button onClick={handleOpenInfosOfTask} className="badge badge-primary badge-pill mr-1">→</button>
            </div>
        </li>
    </ul>
}

// J'exporte mon composant
export default Task