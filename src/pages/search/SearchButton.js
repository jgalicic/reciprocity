import { useState } from 'react'
import SearchBar from './SearchBar';
import './SearchButton.css'

export default function SearchButton({ searchTerm, setSearchTerm}) {
  const [showSearchBar, setShowSearchBar] = useState("false")

  return (
    <>
      {showSearchBar === "false" ? 
        <div 
          onClick={() => setShowSearchBar("true")}
          className="searchButton">Search</div> : 
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      } 
    </>
  )
}
