import React from 'react'
import { Link } from "react-router-dom";


function NavBar(){
    return(
        <div className='navBar'>
            <div className='navbar-logo'>
                Kiran
            </div>
            <ul className='navbar-menu'>
            <li><Link to ="/">Home</Link></li>
                <li><Link to ="/blog">Blog</Link></li>
                <li><Link to ="/contact">Contact</Link></li>
            </ul>

        </div>
    )
}

export default NavBar