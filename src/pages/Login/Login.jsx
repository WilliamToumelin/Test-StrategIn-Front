// src/LoginForm.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let redirectTimer;
    if (successMessage) {
      // Redirection après timer
      redirectTimer = setTimeout(() => {
        navigate("/users");
      }, 1500);
    }
    return () => clearTimeout(redirectTimer);
  }, [successMessage, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });

      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
        sameSite: "None",
      });

      setSuccessMessage(
        "Connexion réussie ! Vous allez être redirigé vers la liste des utilisateurs." ||
          response.data.message
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Erreur lors de la soumission du formulaire de connexion"
        );
      }
      console.error(error.message || "Erreur inconnue");
    }
  };

  return (
    <main className="login-form-container">
      <h1>Test StrategIn</h1>
      <form action="" className="login-form">
        <h2 className="login-form-title">Connectez-vous.</h2>
        {!successMessage ? (
          <>
            <div className="login-form-email">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-password">
              <label>Mot de passe:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="login-form-button"
            >
              Se connecter
            </button>
            {errorMessage && (
              <p className="login-form-errorMessage">{errorMessage}</p>
            )}
          </>
        ) : (
          <p className="login-form-successMessage">{successMessage}</p>
        )}
        <p className="login-form-link">
          Vous n'avez pas encore de compte?{" "}
          <Link to="/register">S'inscrire ici</Link>
        </p>
      </form>
    </main>
  );
};

export default LoginForm;
