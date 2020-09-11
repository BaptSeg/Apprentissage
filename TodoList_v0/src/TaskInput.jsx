import React, {useState, useCallback} from 'react'

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

export default TaskInput