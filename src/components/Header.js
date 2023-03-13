import React from 'react';
import './Header.css';

const Header = ({showAddNewTaskHandler}) => {
  return (
    <header>
        <img className='logo-desktop' src='./images/logo-dark.svg' alt="logo"/>
        <img className='logo-mobile' src='./images/logo-mobile.svg' alt="logo"/>
        <p>Task Management</p>
        <button onClick={showAddNewTaskHandler}>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
            <p className='add-button-title'>Add New Task</p>
        </button>
    </header>
  )
}

export default Header