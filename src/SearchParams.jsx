import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Results from "./Results";

import useBreedList from "./useBreedList";
import fetchSearchParams from "./fetchSearchParams";

const ANIMALS = ["dog", "bird", "cat", "pig", "fish"];

export default function SearchParams() {
  const [inputForm, setInputForm] = useState({
    location: "",
    breed: "",
    animal: "",
  });
  const [animal, setAnimal] = useState("");
  const [breedList] = useBreedList(animal);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputFormData = {
      location: formData.get("location") ?? "",
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
    };

    setInputForm(inputFormData);
  };

  const { data } = useQuery(["search", inputForm], fetchSearchParams);

  const pets = data?.pets ?? [];

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input id="location" placeholder="Location" name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
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
          <select id="breed" disabled={!breedList.length} name="breed">
            <option />
            {breedList.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
