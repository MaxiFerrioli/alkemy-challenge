import axios from "axios";
import React from "react";
import swAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); //El button submit deja de refrescar la pagina//
    const email = e.target.email.value; //con value capturas el valor del campo rellena por el usuario//
    const password = e.target.password.value;
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //VALIDACION
    if (email === "" || password === "") {
      swAlert(<h2>Los campos NO pueden estar vacíos.</h2>); //reemplazo el console.log por SW.A
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert(
        <h2>Debes escribir una dirección de correo electrónico válida.</h2>
      );
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Datos inválidos.</h2>);
      return;
    }

    // libreria AXIOS (peticion, devuelve promesa.)
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Perfecto, ingresaste correctamente.</h2>);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido); //guarda el token en el localStorage del navegador
        navigate("/listado");
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}

      <h2>Formulario de ingreso</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Correo electronico:</span>
          <input type="text" name="email"></input>
        </label>
        <br />
        <label>
          <span>Clave:</span>
          <input type="password" name="password"></input>
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
}

export default Login;
