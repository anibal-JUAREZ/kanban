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
        console.log(copy);
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
        console.log(copy);
        return copy;
        })
   
}
  return (
    <div>
        <Header showAddNewTaskHandler={showAddNewTaskHandler}/>
        
            <section className='task-display'>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`TODO (${toDoTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                        {allTasks.map(task=>{
                            if(task.status==='Todo'){
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                />
                            }
                        })}
                       
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`DOING (${doingTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                    {allTasks.map(task=>{
                            if(task.status==='Doing'){
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                />
                            }
                        })}
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>{`Done (${doneTask})`}</p>
                    </section>
                    <section className='all-tasks-display'>
                    {allTasks.map(task=>{
                            if(task.status==='Done'){
                                return <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    subtasks={task.subtasks}
                                    status={task.status}
                                    changeTheSubtask={changeTheSubtask}
                                    deleteTask={deleteTask}
                                />
                            }
                        })}
                    </section>
                </article>
            </section>
        
        {showAddNewTask && <AddNewTask showAddNewTaskHandler={showAddNewTaskHandler} addNewTask={addNewTask}/>}
    </div>
  )
}

export default MainPage