import React, {useState} from 'react';
import './TaskCard.css';
import TaskCardDescription from './TaskCardDescription';

const TaskCard = (props) => {

  const [showTaskDescription, setShowTaskDescription]= useState(false);
 
  //CALCULATING THE SUBTASKS WITH STATUS ACTIVE
  let tasksActive=0;
  props.subtasks.forEach(task => {
    if(task.status==="active"){
      tasksActive++;
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
            <p>{`${tasksActive} of ${props.subtasks.length} substasks`}</p>
        </div>
        {showTaskDescription && <TaskCardDescription showTaskDescriptionHandler={showTaskDescriptionHandler} taskInformation={props} getInformationSubtaskState={getInformationSubtaskState}/>}
    </>
  )
}

export default TaskCard