import React from 'react'
import '../Onboarding.css'
import ThemeButton from '../../Components/ThemeButton'

const InformationSlide = (props) => {
    return (
        <>
            <div>

                <img src={props.image} className='image' draggable={false} />

                <h1 className='poppins-bold'>{props.title}</h1>
                <p className='poppins-medium'>{props.description}</p>

                <ThemeButton title={props.buttonText} onClick={props.buttonClick} />
            </div>
        </>
    )
}

export default InformationSlide