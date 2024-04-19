import React, { useState } from 'react'
import './Dashboard.css'

import FullLogo from '../../assets/logo.png'
import yoga from '../../assets/icons/yoga.png'
import DashboardContent from './DashboardContent'

const options = [
    {
        title: 'Home',
        value: 'home'
    },
    {
        title: 'Blocked List',
        value: 'blocked_list'
    },
    {
        title: 'Allowed List',
        value: 'allowed_list'
    },
]

const Dashboard = () => {

    const [selected, setSelected] = useState('home')

    return (
        <div className='dashboard-container'>
            <div className='sidebar'>

                <img src={FullLogo} className='logo' draggable={false} />

                <div className='option-container'>
                    {
                        options?.map((item) => {
                            return <div className={`option-button ${selected === item.value ? 'selected' : ''}`} onClick={() => { setSelected(item.value) }}>
                                <img src={yoga} className='option-icon' />
                                <h2 className='option-text poppins-semibold'> {item.title}</h2>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className='content'>
                <DashboardContent tab={selected} />
            </div>
        </div>
    )
}

export default Dashboard