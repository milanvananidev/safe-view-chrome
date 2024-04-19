import React, { useEffect } from 'react'
import './blocked.css'
import '../../common/fonts.css'

import LungIcon from '../../assets/icons/lung.png'
import GameIcon from '../../assets/icons/web.png'
import ExerciseCard from './ExerciseCard'

const Blocked = () => {
    const currentURL = new URL(window.location.href);
    const blockedURL = currentURL.searchParams.get('url');

    useEffect(() => {
        // Track blocked URL
    }, [blockedURL])

    const handleClick = (index) => {

        let tabURL = '';

        if (index === 0) {
            tabURL = "chrome-extension://" + chrome.runtime.id + '/breathing.html'
            // Mixpanel Track
        }

        if (index === 1) {
            tabURL = 'https://poki.com/'
            // Mix panel track
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
            icon: LungIcon,
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
        <div className='blocked-container'>

            <div>
                <h1 className='poppins-bold'>This page is blocked by "Safe View"</h1>
                <h3 className='poppins-medium'>Feeling Tempted? Try These Exercises</h3>
            </div>

            <div className='ex-container'>
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