import React from 'react';
import './DeleteMessage.css';
import ReactDom from 'react-dom';
const BackdropDelete = (props)=>{
  return <div className='backdrop'></div>
}

const DeleteModal = (props)=>{

  const triggerDeleteAction=()=>{
    props.sendDeleteIdTask(props.taskInformation.id);
    props.showDeleteModal();
  }
  
  return <div className='delete-message'>
  <h4>Delete this task?</h4>
  <p>{`Are you sure you want to delete the ‘${props.taskInformation.title}’ task and its subtasks? This action cannot be reversed.`}</p>
  <div className='action-delete-task'>
      <button onClick={triggerDeleteAction}>Delete</button>
      <button onClick={props.showDeleteModal}>Cancel</button>
  </div>
</div>
}
const DeleteMessage = (props) => {
  return (
    <>
       {ReactDom.createPortal(<BackdropDelete />, document.getElementById('backdrop-delete'))}
       {ReactDom.createPortal(<DeleteModal sendDeleteIdTask={props.sendDeleteIdTask} showDeleteModal = {props.showDeleteModal} taskInformation = {props.taskInformation} />, document.getElementById('delete-modal'))} 
        
    </>
    
  )
}

export default DeleteMessage