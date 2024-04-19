import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import '../../common/fonts.css'

import Dashboard from './Dashboard';

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Dashboard />);
