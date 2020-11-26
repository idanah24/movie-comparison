import Admin from './components/AdminUI/Admin';
import Public from './components/PublicUI/Public';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
          <Switch>
            <Route path='/' exact component={Admin} />
            <Route path='/admin' exact component={Admin} />
            <Route path='/public' exact component={Public} />
          </Switch>
    </Router>
  );
}

export default App;
