import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import SearchContent from './pages/search/SearchContent';
import Navbar from './components/Navbar';
import Ingredients from './pages/ingredients/Ingredients';

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/create"><Create /></Route>
          <Route path="/ingredients"><Ingredients /></Route>
          <Route path="/recipes/:id"><Recipe /></Route>
          <Route path="/search"><SearchContent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
