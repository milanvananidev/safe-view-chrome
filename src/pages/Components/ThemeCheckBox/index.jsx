import React from 'react';
import './style.css'

const ThemeCheckBox = (props) => {

    return (
        <label className="custom-checkbox-label">
            <input
                type="checkbox"
                checked={props.checked}
                onChange={() => { props.handleChange(props.id) }}
                className="custom-checkbox-input"
            />
            <span className="custom-checkbox-checkmark"></span>
            <span className="custom-checkbox-text poppins-medium">{props.title}</span>

        </label>
    );
};

export default ThemeCheckBox;
