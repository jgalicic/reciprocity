import { useContext } from 'react'
import {  NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'

import './Footer.css'

export default function Navbar() {
  const { color } = useContext(ThemeContext)

  return (
    <div className="footer" style={{background: color}}>
      <nav>
        <NavLink to="/addingredient" className="footerItem">Add ingredient</NavLink>
        <NavLink to="/logingredients" className="footerItem">Log ingredients</NavLink>
        <NavLink to="/editingredients" className="footerItem">Edit ingredients</NavLink>
      </nav>
    </div>
  )
}

