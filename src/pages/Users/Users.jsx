import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get("http://localhost:3002/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error(error.response.data);
        setErrorMessage(
          error.response.status === 403
            ? "Vous n'avez pas accès à ces informations."
            : "Une erreur s'est produite lors de la récupération des utilisateurs."
        );
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <main className="list-container">
      <h1>Test StrategIn</h1>
      <section className="list">
        <div className="list-top">
          <h2 className="list-title">Liste des Utilisateurs</h2>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Se déconnecter
          </button>
        </div>
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <ul className="list-ul">
            {users.map((user) => (
              <li key={user._id} className="list-li">
                email: <em>{user.email}</em>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Users;
