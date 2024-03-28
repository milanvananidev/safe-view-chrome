import React from 'react';
import { createRoot } from 'react-dom/client';
import Onboarding from './Onboarding';
import './index.css'

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Onboarding />);
