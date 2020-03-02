import React, {useContext, useState} from 'react'
import {Context} from '../../App.jsx'
import classes from './SideBar.module.css'


export default function SibeBar(){
    const {state, dispatch} = useContext(Context)
    const {lists, colors} = state
    
    const [popup, setPopup] = useState(false)
    const [colorId, setColorId] = useState(null)
    const [title, setTitle]= useState('')

    const addLlistHandler = () => title && colorId ?
        (dispatch({type: 'addList', title, colorId}), setPopup(false), setTitle(''), setColorId(null))
        : title ? 
            document.getElementById('colorList').style.borderColor='red' 
            : document.getElementById('input').style.borderColor='red'
    
    return(
        <aside className={classes.sideBar}>
            <ul className={classes.list}>
                <li onClick={() => dispatch({type: 'allLists'})}>All lists</li>
                {lists.map((item) => 
                <li key={item.id}>
                    <div style={{backgroundColor: `${colors.find(i => i.id === item.colorId).color}`}}></div>
                    <span onClick={() => dispatch({type: 'selectList', id: item.id})}>{item.title}</span>
                    <button onClick={() => dispatch({type: 'removeList', id: item.id})}>x</button>
                </li>
                )}
            </ul>
            <div onClick={() => setPopup(!popup)}>+ Add list</div>
            {popup && 
            <article className={classes.form}>
                <div onClick={() => setPopup(false)}>+</div>
                <input id="input" type="text" placeholder=" Title" autoFocus={true} value={title} onChange={e => setTitle(e.target.value)}/>
                <ul id='colorList'>
                    {colors.map(c => <li key={c.id} onClick={() => setColorId(c.id)} style={{backgroundColor: `${c.color}`}}/>)} 
                </ul>
                <button onClick={addLlistHandler}>Add
                </button>
            </article>}
        </aside>
    )
}