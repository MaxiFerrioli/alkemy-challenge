import swAlert from "@sweetalert/with-react";

function Buscador() {
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length === 0) {
      swAlert(<h2>Escribe una palabra clave@!</h2>);
    } else if (keyword.length < 4) {
      swAlert(<h2>Tienes que escribir mas de 4 caracteres</h2>);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          <input
            type="text"
            name="keyword"
            placeholder="Escribe una palabra clave..."
          ></input>
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}
export default Buscador;
