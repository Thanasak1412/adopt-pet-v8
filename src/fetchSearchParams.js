export default async function fetchSearchParams({ queryKey }) {
  const { animal, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `fetchSearchParams is not fetch ${animal},${location},${breed}`
    );
  }

  return apiRes.json();
}
