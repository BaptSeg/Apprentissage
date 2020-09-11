import React, {useState, useCallback} from 'react'

function ButtonSuppAll ({handleDeleteAll}) {

    function handleClick() {
        handleDeleteAll()
    }

    return <div className="text-center mt-3">
        <button className="btn btn-danger" onClick={handleClick}>Supprimer toutes les taches</button>
    </div>
}

export default ButtonSuppAll