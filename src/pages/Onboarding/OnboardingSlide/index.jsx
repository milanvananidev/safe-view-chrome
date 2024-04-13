import React, { useState } from 'react'
import './style.css'

import ThemeCheckBox from '../../Components/ThemeCheckBox'

import Logo from '../../../assets/logo-white-bg.png'
import HeaderImage from '../../../assets/onboarding.png'

const OnbardingSlide = ({ title, subtitle, questions, onsubmit }) => {

    const [selectedQuestion, setSelectedQuestion] = useState('');

    const onChange = (value) => {
        setSelectedQuestion(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedQuestion === '') {
            return alert('Please select one option to continue')
        }

        onsubmit(selectedQuestion);
    }

    return (
        <>
            <div className="onboarding-container">
                <div className="onboarding-info">

                    <div>
                        <div className='logo-box'>
                            <img src={Logo} className='logo' draggable={false} />
                        </div>
                        <h3 className='info-sub-heading rochester-regular'>A few clicks away from</h3>
                        <h2 className='info-heading poppins-bold'>Safe Browsing Experience</h2>
                    </div>

                    <div>
                        <img src={HeaderImage} className='oboarding-header' draggable={false} />
                    </div>
                </div>
                <div className="onboarding-slides">
                    <h3 className='slide-sub-heading rochester-regular'>{subtitle}</h3>
                    <h3 className='slide-heading poppins-bold'>{title}</h3>

                    <div className='questions-container'>
                        {
                            questions?.map((question) => {
                                return <ThemeCheckBox handleChange={() => { onChange(question.value) }} checked={selectedQuestion === question.value} id={question.value} title={question.title} />
                            })
                        }
                    </div>

                    <button className='next-button' onClick={handleSubmit}>Next</button>

                </div>
            </div>
        </>
    )
}

export default OnbardingSlide