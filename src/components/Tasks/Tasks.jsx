import React, {useContext, useState} from 'react'
import {Context} from '../../App.jsx'
import classes from './Tasks.module.css'

export default function Tasks() {
    const {state, dispatch} = useContext(Context)
    const {lists, tasks, colors} = state

    const [popup, setPopup] = useState({list: null, visible: false})
    const [taskTitle, setTaskTitle] = useState('')

    const titleChanger = (e) => setTaskTitle(e.target.value)

    return (
        <main className={classes.todo__tasks}>
            <section>
                {lists.filter(l => l.selected === true).map(sL => 
                <article key={sL.id}>
                    <header style={{color: `${colors.find(i => i.id === sL.colorId).color}`}}>
                        {sL.title}
                        <button onClick={() => setPopup({...popup, list: sL.id, visible: !popup.visible})}>+ Add task</button>
                    </header>
                    <ul>
                        {tasks.filter(sT => sT.listId === sL.id).map(sT => <li key={sT.id}>{sT.text}</li>)}
                    </ul>
                    { popup.visible && popup.list === sL.id && 
                    <div>
                        <button onClick={() => setPopup({...popup, list: null, visible: false})}>Close</button>
                        <input id='input' type="text" placeholder="+ Task name" value={taskTitle} onChange={titleChanger}/>
                        <button onClick={() => taskTitle ?
                            (dispatch({type: 'addTask', listId: sL.id, text: taskTitle}), setTaskTitle(''),
                            setPopup({...popup, list: null, visible: false}))
                            : document.getElementById('input').style.borderColor='red'}>Add</button>
                    </div>
                    }
                </article>)}
            </section>
        </main>
    )
}