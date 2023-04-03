import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

export default function Details() {
  const { id } = useParams();

  const { isLoading, data } = useQuery(["details", id], fetchPet);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐶</h2>
      </div>
    );
  }

  const [pet] = data.pets;
  const { name, animal, breed, images, city, state } = pet;

  return (
    <div className="details">
      <Carousel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
        </h2>
      </div>
    </div>
  );
}
