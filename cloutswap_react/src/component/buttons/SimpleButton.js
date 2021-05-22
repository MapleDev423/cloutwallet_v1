import React from 'react'
import './index.css'

export default function SimpleButton({ text, onClick} ) {
    return (
        <div className="simple_button" onClick={onClick}>
            <p>{text}</p>
        </div>
    )
}
