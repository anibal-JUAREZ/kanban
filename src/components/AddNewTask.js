import React, {useState} from 'react';
import './AddNewTask.css';
import ReactDom from 'react-dom';
import Subtask from './Subtask';
const Backdrop = ({showAddNewTaskHandler}) =>{
    return <div onClick = {showAddNewTaskHandler} className='backdrop'></div>
}

const Modal = (props) =>{
    //NEW TASK INITIAL VALUES 
    const [newTask, setNewTask]=useState({title:"",description:"",subtasks:[], status:""});
    const [subTaskValue, setSubtaskValue]=useState("");
    const [error, setError]=useState({title:false, description:false,status:false});
  


    //CHANGE THE ERROR STATE
    // const changeErrorState=(e)=>{
    //     const property = e.target.dataset.property;
    //     setError(state=>{
    //         if(newTask[property]===''){
    //             return {...state, [property]:true}
    //         }else{
    //             return {...state, [property]:false}
    //         }
    //     })
    // }
     
    //GET THE SUBSTASK VALUE
    const getSubtaskValue=(e)=>{
        setSubtaskValue(e.target.value);
    }

    //ADD NEW TASK
    const sendTaskInformation =()=>{
        if(!newTask.title){
            
            setError(state=>{
                return {...state, title:true}
            })
        }
        if(!newTask.description){
            
            setError(state=>{
                return {...state, description:true}
            })
        }
        if(!newTask.status){
            
            setError(state=>{
                return {...state, status:true}
            })
        }
        if(newTask.title && newTask.description && newTask.status){
            props.addNewTask(newTask)
        }
        
    }

    //GET INPUTS TEXTAREA SELECT INFORMATION
    const getTaskInformation=(e)=>{
        
        const property = e.target.dataset.property;
        setNewTask(state=>{
            return {...state,  [property] : e.target.value}
        })

        //CHANGE THE ERROR STATE
        if(e.target.value && error[property]===true){
            setError(state=>{
                return {...state,  [property] : false}
            })
        }
     }

    //ADD SUBTASK
    const addNewSubtask=()=>{
        if(subTaskValue !==""){
            setNewTask(state=>{
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
        setNewTask(state=>{
            const copy = {...state};
            const index = copy.subtasks.findIndex(e=>e.id === id);
            copy.subtasks.splice(index,1);
            return copy
        })
    }

   

    return  <div className="new-task-form">
    <h3>Add New Task</h3>
    <div className='display'>
        <label>Title</label>
        <input data-property= "title" onChange={getTaskInformation} placeholder={error.title ? "Can't be empty" :'e.g. Take coffee break'} type="text"/>
    </div>
   {error.title && <p className='error'>Can't be empty</p>}
    <div className='display'>
        <label>Description</label>
        <textarea onChange={getTaskInformation} data-property= "description" placeholder='e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little.'>

        </textarea>
        
    </div>
    {error.description &&<p className='error'>Can't be empty</p>}
    <div className='subtasks'>
        <p>Subtasks</p>
        {newTask.subtasks.map(subtask=>(
            <Subtask
                key={subtask.id}
                id={subtask.id}
                description={subtask.description}
                deleteSubtask={deleteSubtask}
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
        <select data-property ="status" onChange={getTaskInformation} name="actions" id="actions">
            <option value=""></option>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
    </div>
    {error.status && <p className='error'>Can't be empty</p>}
    <button onClick={sendTaskInformation} className='create-task'>Create Task</button>
</div>
}
const AddNewTask = ({showAddNewTaskHandler, addNewTask}) => {
    
  return (
    <>
        {ReactDom.createPortal(<Backdrop showAddNewTaskHandler={showAddNewTaskHandler}/>, document.getElementById('backdrop-root'))}
        {ReactDom.createPortal(<Modal addNewTask={addNewTask}/>, document.getElementById('modal-root'))}
       
    </>
  )
}

export default AddNewTask