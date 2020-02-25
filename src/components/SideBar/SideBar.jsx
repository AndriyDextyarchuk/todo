import React, {useContext} from 'react'
import {Context} from '../../App.jsx'
import classes from './SideBar.module.css'


export default function SibeBar(){
    const {lists, colors} = useContext(Context)
 
    return(
        <aside className={classes.todo__sideBar}>
           <ul className={classes.sideBar__list}>
                <li>All lists</li>
                {lists.map((item) => {
                const bgColor = `${colors.find(i => i.id === item.colorId).color}`;
                return <li key={item.id}>
                            <div style={{backgroundColor: bgColor}}>icom</div>
                            <span>{item.title}</span>
                       </li>
                })}
           </ul>
        </aside>
    )
}
