import React from 'react'
import './blocked.css'
import './index.css'
import ExerciseCard from '../Components/ExerciseCard';

import YogaIcon from '../../assets/icons/yoga.png';
import GameIcon from '../../assets/icons/joystick.png';

const Blocked = () => {

    const currentURL = new URL(window.location.href);
    const blockedURL = currentURL.searchParams.get('url');

    const handleClick = (index) => {

        let tabURL = '';

        if (index === 0) {
            tabURL = "chrome-extension://" + chrome.runtime.id + '/breathing.html'
        }

        if (index === 1) {
            tabURL = 'https://poki.com/'
        }


        return chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var currentTab = tabs[0];

            // Get the index of the current tab
            var currentIndex = currentTab.index;

            // Open the breathing exercise tab next to the current tab
            chrome.tabs.create({
                url: tabURL,
                index: currentIndex + 1  // Open next to the current tab
            });
        });
    }

    const exercises = [
        {
            title: 'Deep Breathing',
            desc: 'Try our deep breathing exercise to help center your mind.',
            icon: YogaIcon,
            cta: 'Go To Center',
        },
        {
            title: 'Play Games',
            desc: 'Take a break and play some games to distract yourself.',
            icon: GameIcon,
            cta: 'Select Game To Play',
        }
    ]

    return (
        <div className='full-screen-container'>
            <h1 className='poppins-bold'>The websites is blocked by "Safe View"</h1>
            <p className='poppins-medium'>Feeling Tempted? Try These Exercises</p>

            <div className='excerise-container'>
                {
                    exercises.map(({ title, desc, icon, cta }, index) => {
                        return <ExerciseCard key={index} title={title} desc={desc} icon={icon} cta={cta} onClick={() => handleClick(index)} />
                    })
                }

            </div>
        </div>
    )
}

export default Blocked