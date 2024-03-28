import React from 'react';
import { createRoot } from 'react-dom/client';
import Blocked from './Blocked';
import './index.css'

const container = document.getElementById('app-block-container');
const root = createRoot(container);
root.render(<Blocked />);
