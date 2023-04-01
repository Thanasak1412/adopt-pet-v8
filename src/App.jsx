import { createRoot } from "react-dom/client";

import SearchParams from "./SearchParams";

const App = () => {
  return (
    <>
      <h1>Adopted Pet</h1>
      <SearchParams />
    </>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
