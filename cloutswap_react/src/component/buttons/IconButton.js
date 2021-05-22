import React from 'react'
import './index.css'

export default function IconButton({icon}) {
    return (
        <div className="simple_button">
            <img src={icon} alt={`${icon}`} />
        </div>
    )
}
