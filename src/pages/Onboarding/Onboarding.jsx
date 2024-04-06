import React, { useEffect, useState } from 'react';
import './Onboarding.css';

import InformationSlide from './Slides/InformationSlide';
import OptionsSlide from './Slides/OptionsSlide';

import Logo from '../../assets/icon128.png';
import Incognito from '../../assets/icons/private.png';

import googleAnalytics from '../../google-analytics';

import { digitalPath, effectsOfPorn, howOftenPornConsume, whatTriggers, whenStartedWatching } from './Questions';

const Onboarding = () => {

    const [slide, setSlide] = useState(1);
    const [slideTitle, setSlideTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        mangeSlideQuestions();
    }, [slide])

    const mangeSlideQuestions = () => {
        let tempQuestions = [];
        let tempSlideTitle = '';

        switch (slide) {
            case 2:
                tempQuestions = digitalPath;
                tempSlideTitle = 'Choose Your Digital Path';
                break;
            case 3:
                tempQuestions = whenStartedWatching;
                tempSlideTitle = 'At what age did you start watching Porn?';
                break;
            case 4:
                tempQuestions = howOftenPornConsume;
                tempSlideTitle = 'How often do you consume Porn?';
                break;
            case 5:
                tempQuestions = effectsOfPorn;
                tempSlideTitle = 'Which of these majorly affects due to consuming Porn?';
                break;
            case 6:
                tempQuestions = whatTriggers;
                tempSlideTitle = 'What trigger usually leads you to consume Porn?'
                break;

        }

        setSlideTitle(tempSlideTitle);
        setQuestions(tempQuestions);
    }

    const handleIncognito = () => {
        chrome.tabs.create({
            url: "chrome://extensions/?id=" + chrome.runtime.id,
        });
    }

    const handleSelectAns = (value) => {
        googleAnalytics.fireEvent(value);
        setSlide(slide + 1)
    }

    const renderOnboardingSlides = () => {
        if (slide === 1) {
            return <InformationSlide
                image={Logo}
                title={'Welcome to Safe View'}
                description={'the ultimate guardian of your digital experience.'}
                buttonText={"Let's Start"}
                buttonClick={() => { setSlide(2) }}
            />
        }


        if (slide === 7) {
            return <InformationSlide
                image={Incognito}
                title={'Enable in incognito'}
                description={'Allow safeview to oprate in incognito.'}
                buttonText={"Enable Now"}
                buttonClick={handleIncognito}
            />
        }

        if (slideTitle === '' || questions.length <= 0) {
            return null;
        }

        return <OptionsSlide
            title={slideTitle}
            options={questions}
            buttonText={'Next'}
            onSelect={handleSelectAns}
            backClick={() => { setSlide(slide - 1) }}
        />
    }


    return (
        <>
            <div className='full-screen-container container'>
                {renderOnboardingSlides()}
            </div>
        </>
    )
}

export default Onboarding