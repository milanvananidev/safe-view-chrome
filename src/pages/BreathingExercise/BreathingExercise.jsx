import React, { useRef } from 'react';
import './style.css'

import BreathingVideo from '../../assets/breathing-video.mp4'

const BreathingExercise = () => {

    const videoRef = useRef(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <video
                ref={videoRef}
                src={BreathingVideo}
                autoPlay
                loop
                controls={false}
                draggable={false}
                style={{ height: '100vh', width: 'auto' }}
                onContextMenu={handleContextMenu}
                low={true}
            />
        </>
    )
}

export default BreathingExercise