import {render} from 'react-dom'
import React, {useState} from 'react'


function TaskList ({taches}) {
    return <div>
        <div className="card text-center mt-5">
            <div className="card-body offset-md-4 col-md-4">
                <h5 className="card-title">Mes tâches</h5>
                {taches.map(t => <p key={t}>{t}</p>)}
            </div>
        </div>
    </div>
}


function TaskInput () {

    const [taches, setTaches] = useState([])
    const [input, setInput] = useState('')

    function handleChange (e) {
        setInput(e.target.value)    
    }

    function handleSubmit (e) {
        setTaches([...taches, input])
    }

    return <div className="form-group text-center offset-md-4 col-md-4 mt-5">
        <label htmlFor="task">Entrer une tâche</label>
        <input type="text" className="form-control" name="task" id="task" onChange={handleChange}/>
        <button className="btn btn-primary mt-2" type="submit" onClick={handleSubmit}>Rajouter la tâche</button>
        <TaskList taches={taches}/>
    </div>

}




render(
    <div>
        <TaskInput/>
    </div>,
    document.getElementById('app')
)