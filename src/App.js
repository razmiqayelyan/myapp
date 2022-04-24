import './App.css';
import Navbar from './components/Navbar';
import CoinPage from './components/CoinPage';
import Homepage from './components/Homepage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



function App() {


  return (
    <>
      <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
        </div>
      </BrowserRouter>      
    </>
  );
}

export default App;
