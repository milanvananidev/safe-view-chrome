import React from 'react';
import { createRoot } from 'react-dom/client';
import BreathingExercise from './BreathingExercise';

const container = document.getElementById('app-breathing-container');
const root = createRoot(container);
root.render(<BreathingExercise />);
