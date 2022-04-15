import React from "react";
import { useState, useEffect} from "react";
import { api } from "../api";
import { Spinner, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';

import "./IngredientsPage.css";

export function IngredientsPage(){
  const { slug } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [ingredientss, setIngredients] = useState();

  useEffect(() => {
    setLoading(true);

    api.get('/recipes/ingredients')
    .then((res) => {
      setIngredients(res.data);
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  }, [slug])


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }


  return (
    <div className="ingredients-Page">
      <h2>List of Ingredients</h2>
      <ul>
      {ingredientss?.map((ingredient) =>
        <li key={"id" + ingredient}>{ingredient}</li>)
        }
      </ul>
    </div>
  );
}
