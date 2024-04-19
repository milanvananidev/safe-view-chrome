import React from 'react'
import './style.css'
import Home from '../Home/Home';

const DashboardContent = ({ tab }) => {
    return (
        <>
            {tab === 'home' ? <Home /> : null}
        </>
    )
}

export default DashboardContent;