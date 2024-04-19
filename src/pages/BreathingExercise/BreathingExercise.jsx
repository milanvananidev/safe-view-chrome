import React, { useState, useEffect } from 'react';
import './BreathingExercise.css';

const BreathingExercise = () => {
    const [breathingText, setBreathingText] = useState('Breathe In');
    const [breathingState, setBreathingState] = useState('inhale');
    const [intervalDelay, setIntervalDelay] = useState(4000);
    const [animationSize, setAnimationSize] = useState({ width: 200, height: 200 });

    useEffect(() => {
        const interval = setInterval(() => {
            if (breathingState === 'inhale') {
                setBreathingText('Hold');
                setBreathingState('hold');
            } else if (breathingState === 'hold') {
                setBreathingText('Breathe Out');
                setBreathingState('exhale');
                setIntervalDelay(4000);
            } else if (breathingState === 'exhale') {
                setBreathingText('Hold');
                setBreathingState('hold2');
                setIntervalDelay(4000);
            } else {
                setBreathingText('Breath In');
                setBreathingState('inhale');
                setIntervalDelay(4000);
            }
        }, intervalDelay);

        return () => clearInterval(interval);
    }, [breathingState, intervalDelay]);

    useEffect(() => {
        if (breathingState === 'exhale' || breathingState === 'hold2') {
            setAnimationSize({ width: 200, height: 200 });
        } else {
            setAnimationSize({ width: 400, height: 400 });
        }
    }, [breathingState]);

    return (
        <div className='breathing-container'>
            <div className='center-static'>
                <h2 id='breathing-text'>{breathingText}</h2>
            </div>
            <div className='div-animation' style={{ width: animationSize.width, height: animationSize.height }}> </div>
        </div>
    );
};

export default BreathingExercise;
