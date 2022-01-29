import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <h4>Footer</h4>
            <p>Copyright &copy; 2021</p>
            {/* link to About component */}
            <Link to="/about"> About</Link>



            
        </footer>
    )
}

export default Footer
