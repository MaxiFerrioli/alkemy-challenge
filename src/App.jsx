//Libraries
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

//Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";

//Styles
import "./css/App.css";
import Favoritos from "./components/Favoritos";

function App() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    // console.log(favsInLocal);
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const favMovies = localStorage.getItem("favs");
  let tempMoviesInFavs;
  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

  console.log(tempMoviesInFavs);

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Se agrego la peli");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log("Se elimino la peli");
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header favorites={favorites} />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/listado"
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route
            path="/resultados"
            element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
          <Route
            path="/favoritos"
            element={
              <Favoritos
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
