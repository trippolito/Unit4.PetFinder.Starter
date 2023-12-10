import { useEffect, useState } from "react";


const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/api/v1/pets');
      const petsResponse = await response.json();
      setPets(petsResponse);
    }
    fetchData();
    setLoading(false)
  }, [])
  if (loading) {
    return (
      <div> LOADING ...</div>
    )
  }
  return (
    <>
      <h1>Pet Page</h1>
      <div>Name | Owner</div>
      <hr />
      {pets.map((pet) => { return (<div key={pet.id}>{pet.name} | {pet.owner}</div>) })}
    </>
  )
}

export default PetPage;