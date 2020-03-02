import React from 'react';
import classes from './App.module.css';
import SideBar from './components/SideBar/SideBar.jsx'
import Tasks from './components/Tasks/Tasks.jsx'
import { useReducer } from 'react';

export const Context = React.createContext()

const initialState = {
  lists: [
    {id: 1, colorId: 4, title: 'abc', selected: false},
    {id: 2, colorId: 2, title: 'def', selected: false},
    {id: 3, colorId: 7, title: 'ghi', selected: false},
  ],
  tasks: [
    {id: 1, listId: 1, text:'to do something'},
    {id: 2, listId: 2, text:'to do something else'},
    {id: 3, listId: 3, text:'just do it'},
  ],
  colors: [
    {id: 1, color: 'red'},
    {id: 2, color: 'orange'},
    {id: 3, color: 'yellow'},
    {id: 4, color: 'green'},
    {id: 5, color: 'grey'},
    {id: 6, color: 'blue'},
    {id: 7, color: 'purple'},
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case 'allLists': 
      return {...state, lists: state.lists.map(i => {i.selected = true; return i})};
    case 'selectList': 
      return {...state, lists: state.lists.map(i => {i.id === action.id ? i.selected = true : i.selected = false; return i})}
    case 'addList': {
      const idArray = state.lists.map(i => i.id);
      let newId = 1
      while (idArray.includes(newId)) newId++
      const newList = {id: newId, title: action.title, colorId: action.colorId, selected: false}
      return {...state, lists: [...state.lists, newList]};
    }
    case 'removeList': 
      return {...state, lists: state.lists.filter(i => i.id !== action.id)};
    case 'addTask': {
      const idArray = state.tasks.map(i => i.id);
      let newId = 1
      while (idArray.includes(newId)) newId++
      const newTask = {id:newId, listId: action.listId, text: action.text}
      return {...state, tasks: [...state.tasks, newTask]};
    }
      default: 
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{state, dispatch}}>
      <div className={classes.todo}>
        <SideBar/>
        <Tasks/>   
      </div>
    </Context.Provider>
  );
}