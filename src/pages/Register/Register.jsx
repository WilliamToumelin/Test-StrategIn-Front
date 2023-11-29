import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let redirectTimer;
    if (successMessage) {
      // Redirect après timer
      redirectTimer = setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    return () => clearTimeout(redirectTimer);
  }, [successMessage, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Veuillez fournir une adresse e-mail valide.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/register", {
        email,
        password,
      });
      setSuccessMessage(
        "Inscription réussie ! Vous allez être redirigé vers la page de connexion !" ||
          response.data.message
      );
    } catch (error) {
      setErrorMessage(
        error.response.data.message ||
          "Erreur lors de la soumission du formulaire d'inscription"
      );
      console.error(error.message || "Erreur inconnue");
    }
  };

  // Fonction de validation d'email
  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  // Fonction de validation de mot de passe
  const isValidPassword = (password) => {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password);
  };

  return (
    <main className="register-form-container">
      <h1>Test StrategIn</h1>
      <form action="" className="register-form">
        <h2 className="register-form-title">Inscrivez vous!</h2>
        {!successMessage ? (
          <>
            <div className="register-form-email">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="register-form-password">
              <label>Mot de passe:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p>
                Le mot de passe doit contenir au minimum 8 caractère, 1
                majuscule et 1 chiffre
              </p>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              className="register-form-button"
            >
              S'inscrire
            </button>
            {errorMessage && (
              <p className="register-form-errorMessage">{errorMessage}</p>
            )}
          </>
        ) : (
          <p className="register-form-successMessage">{successMessage}</p>
        )}
        <p className="register-form-link">
          Retour a la page de connexion <Link to="/">ici</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
