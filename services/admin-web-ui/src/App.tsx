import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./components/Map";
import Home from "./views/Home";
import Bikes from "./views/Bikes";
import Cities from "./views/Cities";
import Maps from "./views/Maps";
import Users from "./views/Users";

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/users" element={<Users />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/map/:city" element={<Map />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
