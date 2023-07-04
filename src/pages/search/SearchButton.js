
import SearchBar from './SearchBar';
import './SearchButton.css'

export default function SearchButton({ searchTerm, setSearchTerm}) {

  return <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

}
