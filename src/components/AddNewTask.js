import React from 'react';
import './AddNewTask.css';
import ReactDom from 'react-dom';
const Backdrop = ({showAddNewTaskHandler}) =>{
    return <div onClick = {showAddNewTaskHandler} className='backdrop'></div>
}

const Modal = (props) =>{
    return  <div className="new-task-form">
    <h3>Add New Task</h3>
    <div className='display'>
        <label>Title</label>
        <input type="text"/>
    </div>
    <div className='display'>
        <label>Description</label>
        <textarea></textarea>
        
    </div>
    <div className='subtasks'>
        <p>Subtasks</p>
        <div className='subtask-information'>
            <input type='text'/>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
        </div>
        <button className='add-new-task'>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#635FC7" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
            <p>Add New Subtask</p>
        </button>
    </div>
    <div className='display'>
        <label>Status</label>
        <select name="actions" id="actions">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
    </div>
    <button className='create-task'>Create Task</button>
</div>
}
const AddNewTask = ({showAddNewTaskHandler}) => {
  return (
    <>
        {ReactDom.createPortal(<Backdrop showAddNewTaskHandler={showAddNewTaskHandler}/>, document.getElementById('backdrop-root'))}
        {ReactDom.createPortal(<Modal/>, document.getElementById('modal-root'))}
       
    </>
  )
}

export default AddNewTask