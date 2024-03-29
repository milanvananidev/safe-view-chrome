import React from 'react'
import './blocked.css'

// Some bhagvad gita verses
// Deep Breathing Exercise
// Random Game

const Blocked = () => {

    const currentURL = new URL(window.location.href);
    const blockedURL = currentURL.searchParams.get('url');

    return (
        <div>Blocked</div>
    )
}

export default Blocked