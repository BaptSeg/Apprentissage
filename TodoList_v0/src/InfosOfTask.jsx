import React, {useState, useCallback} from 'react'

function InfosOfTask ({tache, handleClose}) {

    // fonction qui va appeler le callback pour fermer faire disparaitre la InfosOfTask
    function close () {
        handleClose({consult: false, id: null})
    }

    return <div>
        <ul>
            <li>{tache.id}</li>
            <li>{tache.priority}</li>
            <li>{tache.title}</li>
        </ul>
        <button className="btn btn-danger" onClick={close}>Close</button>
    </div>
}

export default InfosOfTask