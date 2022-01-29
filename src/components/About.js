import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button';
import {useNavigate} from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h4>About</h4>
            <p>This is a task tracker to monitor daily activities</p>
            <Button onClick={() =>navigate(-1)}  text='Go Back'/>
            
        </div>
    )
}

export default About
