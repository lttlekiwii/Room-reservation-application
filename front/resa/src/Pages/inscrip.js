import React, { useState } from 'react';
import axios from 'axios';
import '../styles/inscrip.css';

const Inscription = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email
    };

    // Send signup request to the server
    axios.post('http://localhost:8000/signup/', data)
    .then((response) => {
        // Redirect to the connection page if login is successful
        if (response.data.message) {
            window.location.href = "/";
        } else {
            // Display error message if login fails
            setError(response.data.error);
        }
    })
      .catch((error) => {
        // Log and display error message if signup fails
        console.error('Error during signup:', error);
        setError('Une erreur s\'est produite lors de l\'inscription.');
      });
  };

  return (
    <div className="inscription-container">
      <h1>Inscription</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Inscription;
