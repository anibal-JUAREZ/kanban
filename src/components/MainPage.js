import React, {useState, useEffect} from 'react';
import './MainPage.css';
import '../index.css';
import Header from './Header';
import AddNewTask from './AddNewTask';
import TaskCard from './TaskCard';



const MainPage = () => {
 const [showAddNewTask, setShowAddNewTask]= useState(false);


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
       this.style.cursor='grabbing';
    
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
        this.scrollLeft += startX - e.clientX
     })
 },[])


  return (
    <div>
        <Header showAddNewTaskHandler={showAddNewTaskHandler}/>
        
            <section className='task-display'>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>TODO (4)</p>
                    </section>
                    <section className='all-tasks-display'>
                        <TaskCard/>
                        <TaskCard/>
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>DOING (6)</p>
                    </section>
                    <section className='all-tasks-display'>
                        <TaskCard/>
                        <TaskCard/>
                    </section>
                </article>
                <article>
                    <section className='title'>
                        <div className='circle'></div>
                        <p>DONE (7)</p>
                    </section>
                    <section className='all-tasks-display'>
                        <TaskCard/>
                        <TaskCard/>
                    </section>
                </article>
            </section>
        
        {showAddNewTask && <AddNewTask showAddNewTaskHandler={showAddNewTaskHandler}/>}
    </div>
  )
}

export default MainPage