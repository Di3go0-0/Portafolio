import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Home } from './Componentes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </Router>
  );
}

export default App;

