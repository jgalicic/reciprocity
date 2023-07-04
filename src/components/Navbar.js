import { useContext } from 'react'
import {  NavLink } from 'react-router-dom';
import SearchButton from '../pages/search/SearchButton';
import { ThemeContext } from '../context/ThemeContext'

import './Navbar.css'

export default function Navbar({ searchTerm, setSearchTerm}) {
  const { color } = useContext(ThemeContext)

  return (
    <div className="navbar" style={{background: color}}>
      <nav>
        <NavLink exact to="/" className="navItem brand">Reciprocity</NavLink>
        <NavLink to="/create" className="navItem">Create</NavLink>
        <NavLink to="/ingredients" className="navItem">Ingredients</NavLink>
        <NavLink to="/favorites" className="navItem">Favorites</NavLink>
        <NavLink to="/search" className="navItem navSearch"><SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm}/></NavLink>
        
      </nav>
    </div>
  )
}
