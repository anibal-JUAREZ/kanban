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
    container.addEventListener('wheel', (e)=>{
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    })
 })


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