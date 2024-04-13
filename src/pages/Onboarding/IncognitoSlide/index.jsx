import React from 'react'
import './style.css'

import IncognitoIcon from '../../../assets/icons/private.png'

const IncognitoSlide = () => {

    const handleNavigation = () => {
        let id = chrome.runtime.id

        chrome.tabs.create({ url: `chrome://extensions/?id=${id}` })
    }

    return (
        <>
            <div className='inc-slide'>
                <div>
                    <img src={IncognitoIcon} className='image' draggable={false} />
                </div>

                <h2 className='rochester-regular subtitle'>For more powerful blocking</h2>
                <h2 className='title poppins-bold'>Allow in incognito</h2>

                <button className='button poppins-bold' onClick={handleNavigation}> Enable Now </button>
            </div>
        </>
    )
}

export default IncognitoSlide;