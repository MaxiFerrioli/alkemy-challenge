import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

function Buscador() {
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length === 0) {
      swAlert(<h2>Escribe una palabra clave@!</h2>);
    } else if (keyword.length < 4) {
      swAlert(<h2>Tienes que escribir mas de 4 caracteres</h2>);
    } else {
      e.currentTarget.keyword.value = ""; //para que la palabra se borre al darle al submit
      navigate(`/resultados?keyword=${keyword}`); //redirige a resultados
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="keyword"
          placeholder="Escribe una palabra clave..."
        ></input>
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}
export default Buscador;
