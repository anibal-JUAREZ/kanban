import React, {useState} from 'react';
import ReactDom from 'react-dom';
import DeleteMessage from './DeleteMessage';
import SubtaskDetail from './SubtaskDetail';
import EditTask from './EditTask';
import './TaskCardDescription.css';

const Backdrop = (props)=>{
    return <div onClick = {props.hideTaskDescription} className='backdrop'></div>
}

const Modal =(props)=>{

    //GET THE ID TO DELETE
    const sendDeleteIdTask=(id)=>{
        props.getIdToDelete(id)

    }

    //GETTING THE SUBSTASK ID
    const getSubtaskId=(id)=>{
        props.getInformationSubtaskState(props.taskInformation.id,id)
       
    }


  //CALCULATING THE SUBTASKS WITH STATUS ACTIVE
  let tasksCompleted=0;
  props.taskInformation.subtasks.forEach(task => {
    if(task.status==="completed"){
      tasksCompleted++;
    }
  });

  //GET THE TASK TO EDIT
  const getTaskToEdit = (task)=>{
    props.getTaskEdited(task);
    props.showEditModal();
    props.showCrudActionsHandler();
  }

    return <div className='task-detail-description'>
    <div className='header-task'>
        <h3>{props.taskInformation.title}</h3>
        <svg onClick={props.showCrudActionsHandler} width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
    </div>

    {props.showCrudActions && <div className='crud-actions'>
        <p onClick = {props.showEditModal} className='edit-task'>Edit Task</p>
        <p onClick = {props.showDeleteModal} className='delete-task'>Delete Task</p>
    </div>}
    
    <p className='description'>{props.taskInformation.description}</p>
    <p className='subtask'>{`Substasks (${tasksCompleted} of ${props.taskInformation.subtasks.length})`}</p>
        {
            props.taskInformation.subtasks.map(subtask=>(
                <SubtaskDetail key = {subtask.id} subtaskInformation={subtask} getSubtaskId={getSubtaskId}/>
            ))
        }
        
    <p className='status'>Current Status</p>
    <select name="actions" id="actions" defaultValue={props.taskInformation.status}>
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
    </select>
    {/* HERE DELETE MODAL */}
    {props.deleteModal && <DeleteMessage sendDeleteIdTask ={sendDeleteIdTask} showDeleteModal ={props.showDeleteModal} taskInformation={props.taskInformation}/>}
    {props.editModal && <EditTask getTaskToEdit={getTaskToEdit} taskInformation={props.taskInformation} showEditModal={props.showEditModal}/>}
</div>
}

const TaskCardDescription = (props) => {

    const [showCrudActions, setShowCrudActions]=useState(false);
    const [deleteModal, setDeleteModal]=useState(false);
    const [editModal, setEditModal]=useState(false);

    const showCrudActionsHandler = ()=>(
        setShowCrudActions(!showCrudActions)
    )
    const showDeleteModal=()=>{
        setDeleteModal(!deleteModal)
    }
    const showEditModal=()=>{
        setEditModal(!editModal)
    }
  return (
        <>  
            {ReactDom.createPortal(<Backdrop hideTaskDescription={props.showTaskDescriptionHandler}/>, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<Modal getTaskEdited={props.getTaskEdited} editModal={editModal} showEditModal={showEditModal} getIdToDelete={props.getIdToDelete} showDeleteModal = {showDeleteModal} deleteModal ={deleteModal} getInformationSubtaskState={props.getInformationSubtaskState} taskInformation={props.taskInformation} showCrudActions={showCrudActions} showCrudActionsHandler={showCrudActionsHandler}/>, document.getElementById('modal-root'))}
        </>
  )
}

export default TaskCardDescription