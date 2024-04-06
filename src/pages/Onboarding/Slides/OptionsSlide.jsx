import React, { useState } from 'react'
import '../Onboarding.css'
import BackIcon from '../../../assets/icons/left.png'

import ThemeButton from '../../Components/ThemeButton'
import ThemeCheckBox from '../../Components/ThemeCheckBox'

const OptionsSlide = (props) => {

    const [selectedOption, setSelectedOption] = useState(null);

    const onChange = (option) => {
        setSelectedOption(option)
    }

    return (
        <div>
            <img src={BackIcon} className='back-icon' onClick={props.backClick} />

            <h1 className='poppins-bold questions-title'>{props.title}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, margin: '40px 0px' }}>
                {
                    props.options.map((option, index) => {
                        return <ThemeCheckBox key={option.value} checked={option.value === selectedOption} id={option.value} title={option.title} handleChange={onChange} />
                    }) || null
                }
            </div>

            <ThemeButton title={props.buttonText} onClick={() => { props.onSelect(selectedOption) }} />
        </div>
    )
}

export default OptionsSlide;