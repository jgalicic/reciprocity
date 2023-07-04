import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import SearchContent from './pages/search/SearchContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Ingredients from './pages/ingredients/Ingredients';
import AddIngredient from './pages/ingredients/AddIngredient';
import LogIngredients from './pages/ingredients/LogIngredients';
import EditIngredients from './pages/ingredients/EditIngredients';
import EditOneIngredient from './pages/ingredients/EditOneIngredient';

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
          <Route path="/addingredient"><AddIngredient /></Route>
          <Route path="/logingredients"><LogIngredients /></Route>
          <Route path="/editingredients"><EditIngredients /></Route>
          <Route path="/editingredient/:id"><EditOneIngredient /></Route>
        </Switch>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App
