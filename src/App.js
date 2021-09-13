import './App.css';
import {BrowserRouter as Router,Switch,Route } from "react-router-dom"
import Header from './components/Header/Header';
import FooterNav from './components/Footer/FooterNav';
import { Container } from '@material-ui/core';
import Trending from './Pages/Trending/Trending';
import Search from './Pages/Search/Search';
import Movies from './Pages/Movies/Movies';
import Shows from './Pages/Shows/Shows';
function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className="app">
        <Container>
          <Switch>
            <Route exact path="/" component={Trending}/>
            <Route path="/search" component={Search}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/shows" component={Shows}/>
          </Switch>
        </Container>
        </div>
        <FooterNav/>
        
      </Router>
    </>
  );
}

export default App;
