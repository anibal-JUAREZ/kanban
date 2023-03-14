import React, {useState, useEffect} from 'react';
import './MainPage.css';
import '../index.css';
import Header from './Header';
import AddNewTask from './AddNewTask';
import TaskCard from './TaskCard';



const MainPage = () => {
//ALL THE TASKS
const [allTasks, setAllTasks]=useState([]);
//VARIABLE SHOW THE NEW TASK WINDOW
const [showAddNewTask, setShowAddNewTask]= useState(false);

//UPLOADING THE INSTRUCTIONS TO USE THE APP
useEffect(()=>{
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setAllTasks(data);
        
      });
},[])
//MESSAGE THAT SHOWS 0 TASKS ADDED
const noTaskAdded=<div className='no-task'><p>There is nothing here</p><p className='second-paragraph'>Create a new task by clicking on the <span>Add New Task </span> button and get started</p></div>

//DELETE TASK
const deleteTask=(id)=>{
    setAllTasks(state=>{
        const copy=[...state];
        const index=copy.findIndex(e=>e.id===id);
        copy.splice(index,1)
        return copy;
    })
}

//CALCULATING HOW MANY TODO, DOING, DONE TAKS EXISTE
let toDoTask=0;
let doingTask=0;
let doneTask=0;

allTasks.forEach(task=>{
    if(task.status==='Todo'){
        toDoTask++;
    }else if(task.status==='Doing'){
        doingTask++;
    }else{
        doneTask++;
    }
})

//FUNCTION TO CHANGE THE VARAIBLE STATE SHOW THE NEW TASK WINDOW
 const showAddNewTaskHandler =()=>{
    setShowAddNewTask(!showAddNewTask)
 }

 useEffect(()=>{
    const container = document.querySelector('.task-display');
    let pressed=false;
    let startX=0;
    container.addEventListener('mousedown', (e)=>{
       pressed=true;
       startX = e.clientX
       container.style.cursor='grabbing';
    
    })
    container.addEventListener('mouseleave', (e)=>{
        pressed=false;
       
        
     })
     window.addEventListener('mouseup', (e)=>{
        pressed=false;
        container.style.cursor='grab';
        
     })
     container.addEventListener('mousemove', (e)=>{
        if(!pressed){
            return
        }
        container.scrollLeft += startX - e.clientX
     })
 },[])

//ADD A NEW TASK FUNCTION
const addNewTask=(task)=>{
    setAllTasks(state=>{
        let id=0;
        const copy = [...state];
        if(copy.length ===0){
            id=0;
        }else{
            copy.forEach(task=>{
                if(task.id >id){
                    id=task.id
                }
            })
        }
        task.id=id+1;
        copy.push(task);
     
        return copy;

    })
    setShowAddNewTask(false);
}
//CHANGE THE SUBTASK STATE
const changeTheSubtask=(idTask, idSubtask)=>{
    setAllTasks(state=>{
        const copy = [...state];
        const indexTask=copy.findIndex(e=>e.id===idTask);
        const indexSubtask=copy[indexTask].subtasks.findIndex(e=>e.id===idSubtask)
        if(copy[indexTask].subtasks[indexSubtask].status==='active'){
            copy[indexTask].subtasks[indexSubtask].status='completed'
        }else{
            copy[indexTask].subtasks[indexSubtask].status='active'
        }
        
        return copy;
        })
   
}
    //UPDATE THE TASK
    const updateTask=(task)=>{
        setAllTasks(state=>{
            const copy=[...state];
            const index=copy.findIndex(e=>e.id===task.id);
            copy.splice(index, 1, task);
            
            return copy;
        })
    }
  return (
    <div>
        <Header showAddNewTaskHandler={showAddNewTaskHandler}/>
        
            <section className='task-display'>
                {allTasks.length>0 ? <><article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`TODO (${toDoTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                        {allTasks
                        .filter(task=>task.status==='Todo')
                        .map(task=>{
                           
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            
                        })}
                       
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`DOING (${doingTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                    {allTasks
                    .filter(task=>task.status==='Doing')
                    .map(task=>{
                            
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                        
                        })}
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`Done (${doneTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                    {allTasks
                    .filter(task=>task.status==='Done')
                    .map(task=>{
                            
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            
                        })}
                    </section>
                </article></> : noTaskAdded}
            </section>
        
        {showAddNewTask && <AddNewTask showAddNewTaskHandler={showAddNewTaskHandler} addNewTask={addNewTask}/>}
    </div>
  )
}

export default MainPage