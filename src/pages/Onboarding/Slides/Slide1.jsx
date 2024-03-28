import React from 'react'
import '../Onboarding.css'
import ThemeButton from '../../Components/ThemeButton'

const Slide1 = (props) => {
    return (
        <>
            <div className='full-screen-container'>
                <h1 className='poppins-bold'>{props.title}</h1>
                <p className='poppins-medium'>{props.description}</p>

                <ThemeButton title={props.buttonText} onClick={props.buttonClick} />
            </div>
        </>
    )
}

export default Slide1