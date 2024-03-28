import React, { useState } from 'react'
import '../Onboarding.css'
import BackIcon from '../../../assets/icons/left.png'

import ThemeButton from '../../Components/ThemeButton'
import ThemeCheckBox from '../../Components/ThemeCheckBox'

const Slide2 = (props) => {

    const [selectedOption, setSelectedOption] = useState(null);

    const onChange = (value) => {
        setSelectedOption(value)
    }

    const handleClick = () => {
        let value = ''

        if (selectedOption === 0) {
            value = 'stay_produtive'
        } else if (selectedOption === 1) {
            value = 'avoid_distraction'
        } else if (selectedOption === 2) {
            value = 'overcome_porn_addiction'
        } else if (selectedOption === 3) {
            value = 'none'
        }

        props.buttonClick(value)
    }

    const options = ['I aim to stay productive.', "I seek to avoid distractions.", "I'm committed to overcoming my porn addiction.", "None of above."]

    return (
        <div className='full-screen-container'>
            <div>

                <img src={BackIcon} className='back-icon' onClick={props.backClick} />

                <h1 className='poppins-bold'>{'Choose Your Digital Path'}</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 30, margin: '40px 0px', }}>
                    {
                        options.map((option, index) => {
                            return <ThemeCheckBox key={index} checked={index === selectedOption} id={index} title={option} handleChange={onChange} />
                        }) || null
                    }
                </div>

                <ThemeButton title={"Let's Start"} onClick={handleClick} />
            </div>
        </div>
    )
}

export default Slide2