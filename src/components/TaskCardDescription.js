import React, {useState} from 'react';
import ReactDom from 'react-dom';
import SubtaskDetail from './SubtaskDetail';
import './TaskCardDescription.css';

const Backdrop = (props)=>{
    return <div onClick = {props.hideTaskDescription} className='backdrop'></div>
}

const Modal =(props)=>{
    //GETTING THE SUBSTASK ID
    const getSubtaskId=(id)=>{
        props.getInformationSubtaskState(props.taskInformation.id,id)
       
    }


  //CALCULATING THE SUBTASKS WITH STATUS ACTIVE
  let tasksActive=0;
  props.taskInformation.subtasks.forEach(task => {
    if(task.status==="active"){
      tasksActive++;
    }
  });

    return <div className='task-detail-description'>
    <div className='header-task'>
        <h3>{props.taskInformation.title}</h3>
        <svg onClick={props.showCrudActionsHandler} width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
    </div>

    {props.showCrudActions && <div className='crud-actions'>
        <p className='edit-task'>Edit Task</p>
        <p className='delete-task'>Delete Task</p>
    </div>}
    
    <p className='description'>{props.taskInformation.description}</p>
    <p>{`Substasks (${tasksActive} of ${props.taskInformation.subtasks.length})`}</p>
        {
            props.taskInformation.subtasks.map(subtask=>(
                <SubtaskDetail subtaskInformation={subtask} getSubtaskId={getSubtaskId}/>
            ))
        }
        
    <p className='status'>Current Status</p>
    <select name="actions" id="actions" defaultValue={props.taskInformation.status}>
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
            {ReactDom.createPortal(<Modal getInformationSubtaskState={props.getInformationSubtaskState} taskInformation={props.taskInformation} showCrudActions={showCrudActions} showCrudActionsHandler={showCrudActionsHandler}/>, document.getElementById('modal-root'))}
        </>
  )
}

export default TaskCardDescription