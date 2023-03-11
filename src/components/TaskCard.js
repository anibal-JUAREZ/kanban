import React, {useState} from 'react';
import './TaskCard.css';
import TaskCardDescription from './TaskCardDescription';

const TaskCard = () => {

  const [showTaskDescription, setShowTaskDescription]= useState(false);

  const showTaskDescriptionHandler = ()=>{
    setShowTaskDescription(!showTaskDescription)
  }
  return (
    <>
        <div onClick={showTaskDescriptionHandler} className='task-card'>
            <h3>Build UI for onbording flow</h3>
            <p> 0 of 3 substasks</p>
        </div>
        {showTaskDescription && <TaskCardDescription showTaskDescriptionHandler={showTaskDescriptionHandler}/>}
    </>
  )
}

export default TaskCard