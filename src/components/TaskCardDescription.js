import React, {useState} from 'react';
import ReactDom from 'react-dom';
import SubtaskDetail from './SubtaskDetail';
import './TaskCardDescription.css';

const Backdrop = (props)=>{
    return <div onClick = {props.hideTaskDescription} className='backdrop'></div>
}

const Modal =(props)=>{
    return <div className='task-detail-description'>
    <div className='header-task'>
        <h3>Research pricing points of various competitors and trial different business models</h3>
        <svg onClick={props.showCrudActionsHandler} width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
    </div>

    {props.showCrudActions && <div className='crud-actions'>
        <p className='edit-task'>Edit Task</p>
        <p className='delete-task'>Delete Task</p>
    </div>}
    
    <p className='description'>We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
    <p>Substasks (2 of 3)</p>
        <SubtaskDetail/>
        <SubtaskDetail/>
    <p className='status'>Current Status</p>
    <select name="actions" id="actions">
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
    </select>
</div>
}

const TaskCardDescription = (props) => {

    const [showCrudActions, setShowCrudActions]=useState(false);

    const showCrudActionsHandler = ()=>(
        setShowCrudActions(!showCrudActions)
    )
  return (
        <>  
            {ReactDom.createPortal(<Backdrop hideTaskDescription={props.showTaskDescriptionHandler}/>, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<Modal showCrudActions={showCrudActions} showCrudActionsHandler={showCrudActionsHandler}/>, document.getElementById('modal-root'))}
        </>
  )
}

export default TaskCardDescription