import './App.css';
import Main from './components/Main'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar/>
      <div className="container">
	    <Main/>
      </div>
    </div>
  );
}

export default App;
