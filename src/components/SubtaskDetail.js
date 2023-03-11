import React from 'react';
import './SubtaskDetail.css';

const SubtaskDetail = (props) => {
  //SENDING THE SUBTASK ID
  const sendSubtaskId=()=>{
    props.getSubtaskId(props.subtaskInformation.id)
  }
  return (
    <div className='check-subtask'>
        <div onClick = {sendSubtaskId} className={props.subtaskInformation.status ==='completed' ? 'check background-check' : 'check'}>
          {props.subtaskInformation.status ==='completed' && <svg  width="10" height="8" xmlns="http://www.w3.org/2000/svg"><path stroke="#FFF" stroke-width="2" fill="none" d="m1.276 3.066 2.756 2.756 5-5"/></svg>}
        </div>
          <p className={props.subtaskInformation.status ==='completed' && 'paragraph-check'}>{props.subtaskInformation.description}</p>
    </div>
  )
}

export default SubtaskDetail