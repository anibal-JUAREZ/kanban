import React, {useState} from 'react';
import './Subtask.css';

const Subtask = (props) => {
  const [description, setDescription]=useState(props.description);
  const [error, setError]=useState(false);
  const [updated, setUpdated]=useState(false);
 
  const triggerDeleteSubtask=()=>{
      props.deleteSubtask(props.id)
  }

  const getDescriptionHandler=(e)=>{
    setDescription(e.target.value)
    if(e.target.value && error){
      setError(false);
    }
  }

  const editSubtaskHandler=(e)=>{
    if(e.key==='Enter'){
      if(!description){
        setError(true);
      }else{
        props.editSubtask(props.id, description);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      }
     
    }
    
  }
  return (
    <>
    <div className='subtask-crud'>
        <input className={error ? 'error-border':''} onKeyDown={editSubtaskHandler} value={description} onChange={getDescriptionHandler}/>
       
          {/* <p>{props.description}</p> */}
        <svg onClick={triggerDeleteSubtask} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="Currentcolor" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
    </div>
    {error && <p className='error'>Can't be empty!. The previous contet will appear</p>}
    {updated && <p className='updated'>Subtask updated!</p>}
    </>
  )
}

export default Subtask