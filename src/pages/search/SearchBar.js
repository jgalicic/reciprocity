import { useHistory } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons';


import "./SearchBar.css"


export default function SearchBar({ searchTerm, setSearchTerm}) {

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/search?q=${searchTerm}`)
  }


  return (    
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        
        <input
          autoFocus
          type="text" 
          id="search"
          value={searchTerm}
          onChange={e=>setSearchTerm(e.target.value)}
          required />
        <FontAwesomeIcon 
          icon={faSearch} 
          className="searchIcon"/>
      </form>
      
    </div>)
}
