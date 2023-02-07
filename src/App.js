import logo from './logo.svg';
import './App.css';
import CountryCapitalGame from './components/CountryCapitalGame';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseContinent from './components/ChooseContinent';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ChooseContinent />} />
          <Route exact path="/game" element={<CountryCapitalGame />} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
