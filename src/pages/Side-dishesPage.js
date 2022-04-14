import React from "react";
import { useState, useEffect } from "react";
import { api } from "../api";
import { Spinner, Alert } from 'reactstrap';
import "./Side-dishesPage.css";

export function SidedishesPage(){
  const [sideDishes, setSideDishes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();


  useEffect(() => {
    setLoading(true);

    api.get(`/recipes/side-dishes`)
    .then((res) => {
      setSideDishes(res.data);
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  }, [])


  // useEffect(() => {
  //   setLoading(true);

  //   api
  //     .get('/recipes')
  //     .then((res) => {
  //       const sideD = res.data.map((recipe) => recipe.sideDish);
  //       const filteredSideD = sideD.filter((element) => element !== undefined);

  //       setSideDishes(filteredSideD);
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));

  // }, [])


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  console.log(sideDishes);

  return (
    <div className="side-dish-page">
      <h2>List of Side Dish:</h2>
      <ul>
      {sideDishes?.map((item) => (
        <li>{item}</li>
        )
      )}
      </ul>
    </div>
  );

}
