import React, {useState} from 'react';
import './TaskCard.css';
import TaskCardDescription from './TaskCardDescription';

const TaskCard = (props) => {

  const [showTaskDescription, setShowTaskDescription]= useState(false);

  //RECEIVING THE ID TO DELETE
  const getIdToDelete=(id)=>{
    props.deleteTask(id);
  }
 
  //CALCULATING THE SUBTASKS WITH STATUS ACTIVE
  let tasksCompleted=0;
  props.subtasks.forEach(task => {
    if(task.status==="completed"){
      tasksCompleted++;
    }
  });
    const showTaskDescriptionHandler = ()=>{
    setShowTaskDescription(!showTaskDescription)
  }
  //RECEIVING THE TASKID AND SUBTASKID 
  const getInformationSubtaskState=(idTask, idSubtask)=>{
    props.changeTheSubtask(idTask,idSubtask);
  }
  return (
    <>
        <div onClick={showTaskDescriptionHandler} className='task-card'>
            <h3>{props.title}</h3>
            <p>{`${tasksCompleted} of ${props.subtasks.length} substasks`}</p>
        </div>
        {showTaskDescription && <TaskCardDescription getIdToDelete={getIdToDelete} showTaskDescriptionHandler={showTaskDescriptionHandler} taskInformation={props} getInformationSubtaskState={getInformationSubtaskState}/>}
    </>
  )
}

export default TaskCard