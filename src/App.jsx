import { createRoot } from "react-dom/client";
import { createElement } from "react";

const Pet = (props) =>
  createElement("div", {}, [
    createElement("h1", { key: props.name }, props.name),
    createElement("h2", { key: props.animal }, props.animal),
    createElement("h2", { key: props.breed }, props.breed),
  ]);

const App = () =>
  createElement("div", {}, [
    createElement("h1", { key: "Adopted Pet" }, "Adopted Pet"),
    createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese",
      key: "Luna",
    }),
    createElement(Pet, {
      name: "Humming",
      animal: "Bird",
      breed: "Trochilidae",
      key: "Humming",
    }),
    createElement(Pet, {
      name: "Abyss",
      animal: "Cat",
      breed: "Abyssinian",
      key: "Abyss",
    }),
  ]);

const root = createRoot(document.getElementById("root"));

root.render(createElement(App));
