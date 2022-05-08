import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swAlert from "@sweetalert/with-react";
import axios from "axios";

function Resultados() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=e79dfe9fcb65825a15e344de030f4422&language=es-ES&query=${keyword}`;
    axios.get(endPoint).then((response) => {
        const moviesArray = response.data.results;
        if (moviesArray.length === 0) {
          swAlert(<h2>Tu busqueda no arrojo resultados</h2>);
        }
        setMoviesResults(moviesArray);
      })
      .catch((error) => console.log(error));
  }, [keyword]);

  return (
    <>
      <h2>Buscaste: {keyword}</h2>
      {moviesResults.length === 0 && <h3>No hay resultados.</h3>}
      <div className="row">
        {moviesResults.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="Imagen"
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">{oneMovie.overview}</p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Resultados;
