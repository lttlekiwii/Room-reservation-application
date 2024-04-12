import './App.css';  // Import CSS file for styling
import React from 'react';  // Import React library
import ReactDOM from "react-dom/client";  // Import ReactDOM for rendering
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Import necessary components from react-router-dom
import Inscription from './Pages/inscrip';  // Import the Inscription component
import Connexion from './Pages/connexion';  // Import the Connexion component
import Accueil from './Pages/accueil';  // Import the Accueil component

export default function App() {
  return (
    <> {/* Fragment shorthand syntax */}
    <BrowserRouter>  {/* Wrap the routes with BrowserRouter component */}
      <Routes>  {/* Define the routes */}
      
      <Route path="/" element={<Connexion />} />  {/* Route for the Connexion component */}
      <Route path="/inscription" element={<Inscription />} />  {/* Route for the Inscription component */}
      <Route path='/Accueil' element={<Accueil/>} />  {/* Route for the Accueil component */}
         
          
      </Routes>  {/* End of Routes component */}
    </BrowserRouter>  {/* End of BrowserRouter component */}

    {/* Additional content goes here */}
   
    </> 
  );
}
