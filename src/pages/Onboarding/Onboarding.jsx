import React, { useState } from 'react';
import './Onboarding.css';

import Slide1 from './Slides/Slide1';
import Slide2 from './Slides/Slide2';

import Logo from '../../assets/icon128.png'
import Incognito from '../../assets/icons/private.png'

import googleAnalytics from '../../google-analytics';

const Onboarding = () => {

    const [slide, setSlide] = useState(1);

    const handleIncognito = () => {
        chrome.tabs.create({
            url: "chrome://extensions/?id=" + chrome.runtime.id,
        });
    }

    const handleEventCall = (value) => {
        googleAnalytics.fireEvent(value);
        setSlide(3)
    }

    if (slide === 1) {
        return (
            <Slide1
                image={Logo}
                title={'Welcome to Safe View'}
                description={'the ultimate guardian of your digital experience.'}
                buttonText={"Let's Start"}
                buttonClick={() => { setSlide(2) }}
            />
        )
    }

    if (slide === 2) {
        return (
            <Slide2 buttonClick={handleEventCall} backClick={() => { setSlide(1) }} />
        )
    }

    if (slide === 3) {
        return (
            <Slide1
                image={Incognito}
                title={'Allow In Incognito'}
                description={'allow Safe View to operate in incognito mode.'}
                buttonText={"Enable Now"}
                buttonClick={handleIncognito}
            />
        )
    }
}

export default Onboarding