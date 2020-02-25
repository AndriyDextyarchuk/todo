import React from 'react';
import classes from './App.module.css';
import SideBar from './components/SideBar/SideBar.jsx'
import Tasks from './components/Tasks/Tasks.jsx'

export const Context = React.createContext()

const state = {
  lists: [
    {id: 1, colorId: 4, title: 'abc'},
    {id: 2, colorId: 2, title: 'def'},
    {id: 3, colorId: 3, title: 'ghi'},
  ],
  tasks: [
    {id: 1, listId: 3, text:'to do something'},
    {id: 2, listId: 1, text:'to do something else'},
    {id: 3, listId: 2, text:'just do it'},
  ],
  colors: [
    {id: 1, color: '#000'},
    {id: 2, color: '#333'},
    {id: 3, color: '#666'},
    {id: 4, color: '#999'},
    {id: 5, color: '#bbb'},
  ],
}

export default function App() {
  return (
    <Context.Provider value={state}>
      <div className={classes.todo}>
        <SideBar/>
        <Tasks/>   
      </div>
    </Context.Provider>
  );
}