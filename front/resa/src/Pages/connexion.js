import axios from 'axios';
import React, { useState } from 'react';
import '../styles/connexion.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password
        };

        // Send login request to the server
        axios.post('http://localhost:8000/login/', data)
            .then((response) => {
                // Redirect to home page if login is successful
                if (response.data.message) {
                    window.location.href = "/Accueil";
                } else {
                    // Display error message if login fails
                    setError(response.data.error);
                }
            })
            .catch((error) => {
                // Log and display error message if request fails
                console.error(error);
                setError('Une erreur s\'est produite lors de la connexion.');
            });
    };

    return (
        <div className="connexion-container">
            <h1>Connexion</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Nom d'utilisateur</label>
                    <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <a href="/inscription">S'inscrire</a>
        </div>
    );
};

export default Connexion;
