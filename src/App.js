// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/font.css';
import MainPage from "./pages/main";
import Header from "./components/Header";
// import About from "./pages/About";
import HowTo from "./pages/HowTo";
// import Archive from "./pages/Archive";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<MainPage />} />
        
       
        <Route path="/howto" element={<HowTo />} />
        
      
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/archive" element={<Archive />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
