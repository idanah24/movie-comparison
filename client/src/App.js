import Admin from './components/AdminUI/Admin';
import EditMovies from './components/AdminUI/EditMovies';
import Public from './components/PublicUI/Public';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  return (
    
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/admin' exact component={Admin} />
        <Route path='/admin/editMovies' exact component={EditMovies} />
        <Route path='/public' exact component={Public} />
      </Switch>
    </Router>
  );
}

export default App;
