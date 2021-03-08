// import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Admin from './Admin';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';

import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="routes container">
          <Route exact path="/" component={Register} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/register" component={Register} />
         <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
