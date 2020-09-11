import {render} from 'react-dom'
import React, {useState, useCallback} from 'react'
import TaskStore from "./TaskStore";


render(
    <div>
        <TaskStore/>
    </div>,
    document.getElementById('app')
)