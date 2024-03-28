import React from 'react'
import './style.css'

const ThemeButton = (props) => {
    return (
        <div className='button' onClick={props.onClick}>
            <span className='button-text poppins-semibold'>{props.title}</span>
        </div>
    )
}

export default ThemeButton