// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.py4e.com/api/people');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const fetchDetails = async (urls) => {
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      return responses.map(response => response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const getCharacterDetails = async (character) => {
    const films = await fetchDetails(character.films);
    const vehicles = await fetchDetails(character.vehicles);

    return {
      films,
      vehicles
    };
  };

  const renderCharacterDetails = async (character) => {
    const { films, vehicles } = await getCharacterDetails(character);

    // Render the character details in the table
    console.log('Character:', character.name);
    console.log('Films:', films);
    console.log('Vehicles:', vehicles);
  };

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Films</th>
            <th>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>{character.films}</td>
              <td>{character.vehicles}</td>
              <td><button onClick={() => renderCharacterDetails(character)}>Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
