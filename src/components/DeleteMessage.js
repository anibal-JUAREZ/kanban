import React from 'react';
import './DeleteMessage.css';
const DeleteMessage = () => {
  return (
    <>
        <div className='backdrop'></div>
        <div className='delete-message'>
            <h4>Delete this task?</h4>
            <p>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            <div className='action-delete-task'>
                <button>Delete</button>
                <button>Cancel</button>
            </div>
        </div>
    </>
    
  )
}

export default DeleteMessage