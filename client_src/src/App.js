import './App.css';
import Main from './components/Main'
import Navbar from './components/Navbar'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './components/loading';

function App() {

  const { isLoading } = useAuth0;

  if(isLoading){
    return(
      <div>
        <Loading />
      </div>
    );
  }
  return (
      <div>
        <Navbar />
        <div className="container">
        <Main/>
        </div>
      </div>
  );
}

export default App;
