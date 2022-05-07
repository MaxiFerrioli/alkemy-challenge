//Libraries
import { Routes, Route, BrowserRouter } from "react-router-dom";

//Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";

//Styles
import "./css/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/detalle" element={<Detalle />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;