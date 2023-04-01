import { useEffect, useState } from "react";

import Pet from "./Pet";

const ANIMALS = ["dog", "bird", "cat", "pig", "fish"];

export default function SearchParams() {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestAnimals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestAnimals() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const petList = await res.json();

    console.log("petList => ", petList);

    setPets(petList.pets);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    requestAnimals();
  };

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.length &&
        pets.map(({ id, name, animal, breed }) => (
          <Pet key={id} name={name} animal={animal} breed={breed} />
        ))}
    </div>
  );
}