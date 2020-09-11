import React, {useState, useCallback} from 'react'
import TaskInput from "./TaskInput";
import Task from "./Task";
import ButtonSuppAll from "./ButtonSuppAll";
import InfosOfTask from "./InfosOfTask";

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
            return b.priority - a.priority
        })
    }

    return [taches, TaskChangement]
}

/**
 * Composant
 */
function TaskStore () {

    const [taches, setTaches] = useStateTask([
        {id: 1, priority: 0, title:"Tache 1"},
        {id: 2, priority: 5, title:"Tache 2"},
        {id: 3, priority: 10, title:"Tache 3"},
        {id: 4, priority: 6, title:"Séparer le composant input de modification"},
        {id: 5, priority: 15, title:"Gérer la suppression d'un élément (position)"}
        /*{id: 4, position: 4, title:"Faire les devoirs"},
        {id: 5, position: 5, title:"Promener le chien"},
        {id: 6, position: 6, title:"Faire le ménage"}*/
    ])

    // Etat qui va permettre de stocker si les informations d'une tâche est entrain d'être consultée et de quelle tâche il s'agit
    const [consultTache, setConsultTache] = useState({consult: false, id: null})
    console.log(consultTache)

    function addTaches(title) {
        const tache = {
            id: Math.max.apply(Math, taches.map(t => t.id)) + 1,
            priority: 0,
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

    function modifyTache(id, new_priority, new_title) {
        const new_taches = taches.map(t => t.id === id ? {id: id, priority: new_priority, title: new_title} : t)
        setTaches(new_taches)
    }

    return <div className="row">
        <TaskInput handleAdd={addTaches}></TaskInput>
        <div className="offset-md-2 col-md-4">
            {taches.map(t =>
                <Task key={t.id}
                      id={t.id}
                      title={t.title}
                      priority={t.priority}
                      handleDelete={removeTache}
                      handleModify={modifyTache}
                      handleConsultTache={setConsultTache}
                      consulting={t.id === consultTache.id ? true : false}
                ></Task>)}
            {taches.length > 0 ? <ButtonSuppAll handleDeleteAll={removeAll}/> : null}
        </div>
        <div className="offset-md-1 col-md-3">
            {consultTache.consult ? <InfosOfTask tache={taches.find(t => t.id === consultTache.id)} handleClose={setConsultTache} handleModify={modifyTache}/> : null}
        </div>
    </div>
}

export default TaskStore


