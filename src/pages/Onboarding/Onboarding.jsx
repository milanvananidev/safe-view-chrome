import React, { useState } from 'react'
import './Onboarding.css'

import OnbardingSlide from './OnboardingSlide'
import { digitalPath, howOftenPornConsume, effectsOfPorn, whatTriggers } from './Questions';
import IncognitoSlide from './IncognitoSlide';

const Onboarding = () => {

    const [currSlide, setCurrSlide] = useState(1);


    const handlesubmit = (value) => {
        // call analytics
        setCurrSlide(currSlide + 1)
    }

    return (
        <>
            {currSlide === 1 ? <OnbardingSlide {...digitalPath} onsubmit={(value) => { handlesubmit(value) }} /> : null}
            {currSlide === 2 ? <OnbardingSlide {...howOftenPornConsume} onsubmit={(value) => { handlesubmit(value) }} /> : null}
            {currSlide === 3 ? <OnbardingSlide {...effectsOfPorn} onsubmit={(value) => { handlesubmit(value) }} /> : null}
            {currSlide === 4 ? <OnbardingSlide {...whatTriggers} onsubmit={(value) => { handlesubmit(value) }} /> : null}
            {currSlide === 5 ? <IncognitoSlide /> : null}
        </>
    )
}

export default Onboarding