import React, {useState} from 'react';
import './AddNewTask.css';
import ReactDom from 'react-dom';
import Subtask from './Subtask';
const Backdrop = ({showEditModal}) =>{
    return <div onClick = {showEditModal} className='backdrop'></div>
}

const ModalEditTask = (props) =>{
    //NEW TASK INITIAL VALUES 
    const [task, setTask]=useState({
        id:props.taskInformation.id,
        title:props.taskInformation.title,
        description:props.taskInformation.description,
        status:props.taskInformation.status,
        subtasks:props.taskInformation.subtasks
    });
    const [subTaskValue, setSubtaskValue]=useState("");
    const [error, setError]=useState({title:false, description:false,status:false});
  

    //BEGIN EDIT INFORMATION--------------------

    //GET INPUTS TEXTAREA SELECT INFORMATION
    const getTaskInformation=(e)=>{
        
        const property = e.target.dataset.property;
        setTask(state=>{
            return {...state,  [property] : e.target.value}
        })

        //CHANGE THE ERROR STATE
        if(e.target.value && error[property]===true){
            setError(state=>{
                return {...state,  [property] : false}
            })
        }
     }

      //GET THE SUBSTASK VALUE
    const getSubtaskValue=(e)=>{
        setSubtaskValue(e.target.value);
    }

      //ADD SUBTASK
    const addNewSubtask=()=>{
        if(subTaskValue !==""){
            setTask(state=>{
                let id=0;
                const copy = {...state}
                if(copy.subtasks.length === 0){
                    id=0;
                }else{
                    copy.subtasks.forEach(oneSubtask=>{
                        if(oneSubtask.id>id){
                            id=oneSubtask.id
                        }
                    })
                
                }
                copy.subtasks.push({id:id+1, description:subTaskValue,status:"active"})
                return copy;
            })
        }
        
        setSubtaskValue("");
    }

    //DELETE SUBTASK
    const deleteSubtask=(id)=>{
        setTask(state=>{
            const copy = {...state};
            const index = copy.subtasks.findIndex(e=>e.id === id);
            copy.subtasks.splice(index,1);
            return copy
        })
    }



    //END EDIT INFORMATION-------------------------
 
     //EDIT SUBSTAK

     const editSubtask=(id, subtask)=>{
        setTask(state=>{
            const copy = {...state};
            const index = copy.subtasks.findIndex(e=>e.id === id);
            copy.subtasks[index].description=subtask;
            return copy;
        })
     }
   

    //EDIT TASK
    const sendTaskInformationEdit =()=>{
        if(!task.title){
            
            setError(state=>{
                return {...state, title:true}
            })
        }
        if(!task.description){
            
            setError(state=>{
                return {...state, description:true}
            })
        }
        if(!task.status){
            
            setError(state=>{
                return {...state, status:true}
            })
        }
         if(task.title && task.description && task.status){
            props.getTaskToEdit(task);
         }
        
    }

    
   

   

    return  <div className="new-task-form">
    <h3>Edit Task</h3>
    <div className='display'>
        <label className={error.title ? 'error-title' : ''}>Title</label>
        <input className={error.title ? 'error-border' : ''} value={task.title} data-property= "title" onChange={getTaskInformation} placeholder={'e.g. Take coffee break'} type="text"/>
    </div>
   {error.title && <p className='error'>Can't be empty</p>}
    <div className='display'>
        <label className={error.title ? 'error-title' : ''}>Description</label>
        <textarea className={error.title ? 'error-border' : ''} value={task.description} onChange={getTaskInformation} data-property= "description" placeholder='e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little.'>

        </textarea>
        
    </div>
    {error.description &&<p className='error'>Can't be empty</p>}
    <div className='subtasks'>
        <p>Subtasks</p>
        {task.subtasks.map(subtask=>(
            <Subtask
                key={subtask.id}
                id={subtask.id}
                description={subtask.description}
                deleteSubtask={deleteSubtask}
                editSubtask={editSubtask}
            />
        ))}
        <div className='subtask-information'>
            <input onChange={getSubtaskValue} value = {subTaskValue} type='text' placeholder='e.g. Make coffee'/>
            {/* <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg> */}
        </div>
        <button onClick ={addNewSubtask} className='add-new-task'>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#635FC7" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
            <p>Add New Subtask</p>
        </button>
    </div>
    <div className='display'>
        <label>Status</label>
        <select value={task.status} data-property ="status" onChange={getTaskInformation} name="actions" id="actions">
            <option value=""></option>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
    </div>
    {error.status && <p className='error'>Can't be empty</p>}
    <button onClick={sendTaskInformationEdit} className='create-task'>Save Changes</button>
</div>
}
const AddNewTask = (props) => {
    
  return (
    <>
        {ReactDom.createPortal(<Backdrop showEditModal={props.showEditModal} />, document.getElementById('backdrop-root'))}
        {ReactDom.createPortal(<ModalEditTask getTaskToEdit={props.getTaskToEdit} taskInformation={props.taskInformation}/>, document.getElementById('modal-root'))}
       
    </>
  )
}

export default AddNewTask