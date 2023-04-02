import Pet from "./Pet";

export default function Results({ pets }) {
  return (
    <div className="search">
      {!pets.length ? (
        <>No Pet Found.</>
      ) : (
        pets.map((pet) => <Pet key={pet.id} pet={pet} />)
      )}
    </div>
  );
}
