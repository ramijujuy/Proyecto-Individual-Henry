import './App.css';
import Bienvenida from './components/bienvenida';
import Home from './components/home';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NewDog from './components/newdog';
import Dogdetail from './components/dogdetail';


function App() {
  console.log("llego al app")
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/'><Bienvenida/></Route>
      <Route exact path='/home'><Home/></Route>
      <Route exact path='/dogs'><NewDog/></Route>
      <Route exact path='/dogs/detail/:id' component= {Dogdetail} />

      </Switch>
       
    </div>
    </BrowserRouter>
  );
}

export default App;
