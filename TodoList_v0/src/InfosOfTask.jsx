import React, {useState, useCallback} from 'react'

function InfosOfTask ({tache, handleClose, handleModify}) {

    // On défini deux états pour suivre les valeurs entré dans les inputs
    const [newTitle, setNewtitle] = useState(tache.title)
    const [newPriority, setNewPriority] = useState(tache.priority)

    function handleNewtitle(e) {
        setNewtitle(e.target.value)
    }

    function handleNewPriority (e) {
        setNewPriority(e.target.value)
    }

    function handleSubmit (e) {
        handleModify(tache.id, newPriority, newTitle)
    }

    // fonction qui va appeler le callback pour fermer faire disparaitre la InfosOfTask
    function handleClickToClose (e) {
        handleClose({consult: false, id: null})
    }

    function isDisabled() {
        return !(newPriority <= 10) && (newPriority >= 0)
    }

    return <div className="card">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mr-2">{tache.title}</h5>
                <button onClick={handleClickToClose} className="badge badge-danger badge-pill mr-1">X</button>
            </div>
            <hr/>
            <div className="form-group">
                <label htmlFor="title">Titre de la tâche</label>
                <input className="form-control mb-2" type="text" id="title" name="title" value={newTitle} onChange={handleNewtitle}/>

                <label htmlFor="priority">Priorité</label>
                <input className="form-control" type="number" min="0" max="10" name="priority" id="priority" placeholder="Une valeur entre 0 et 10" value={newPriority} onChange={handleNewPriority}/>

                <div className="text-center mt-4">
                    <button className="btn btn-success" onClick={handleSubmit} disabled={isDisabled}>Valider les modifications</button>
                </div>
            </div>
        </div>
    </div>

}

export default InfosOfTask