import React from 'react'
import './blocked.css'

const ExerciseCard = ({ icon, title, desc, cta, onClick }) => {

    if (!icon || !title || !desc || !cta || !onClick) { return null }

    return (
        <div class="card">
            <div class="icon-box">
                <img src={icon} alt="exericse icon" />
                <h2 className='title-card poppins-bold'>{title}</h2>
            </div>
            <p className='description-card poppins-medium'>{desc}</p>
            <button onClick={onClick} class="cta">{cta}</button>
        </div>
    )
}

export default ExerciseCard