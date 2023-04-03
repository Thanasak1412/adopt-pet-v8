import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const { data, status } = useQuery(["breed", animal], fetchBreedList);

  return [data?.breeds ?? [], status];
}
