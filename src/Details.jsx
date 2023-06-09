import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";

import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

function Details() {
  const { id } = useParams();

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); //NOSONAR

  const [showModal, setShowModal] = useState(false);

  const { isLoading, data } = useQuery(["details", id], fetchPet);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐶</h2>
      </div>
    );
  }

  const [pet] = data.pets;
  const { name, animal, breed, images, city, state, description } = pet;

  const handleClickConfirm = () => {
    setAdoptedPet(pet);
    navigate("/");
  };

  return (
    <div className="details">
      <Carousel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
          <button onClick={() => setShowModal(true)}>Adopt {name}</button>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={handleClickConfirm}>Yes</button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </h2>
      </div>
    </div>
  );
}

export default function DetailErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
