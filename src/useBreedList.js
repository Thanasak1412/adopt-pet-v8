import { useCallback, useEffect, useRef, useState } from "react";

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  const cacheRef = useRef({});

  const requestBreedList = useCallback(async () => {
    setStatus("loading");

    setBreedList([]);
    const url = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;
    const res = await fetch(url);
    const json = await res.json();

    cacheRef.current[animal] = json.breeds || [];
    setBreedList(cacheRef.current[animal]);

    setStatus("loaded");
  }, [animal]);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (cacheRef.current[animal]) {
      setBreedList(cacheRef.current[animal]);
    } else {
      requestBreedList();
    }
  }, [animal, requestBreedList]);

  return [breedList, status];
}
