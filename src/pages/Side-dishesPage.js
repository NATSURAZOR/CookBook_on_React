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

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  return (
    <div className="side-dish-page">
      <h2>List of Side Dish:</h2>
      <ul>
      {sideDishes?.map((item, index) => (
        <li key={"id" + index + item}>{item}</li>
        )
      )}
      </ul>
    </div>
  );

}
