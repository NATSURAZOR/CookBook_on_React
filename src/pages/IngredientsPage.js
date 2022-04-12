import React from "react";
import { useState, useEffect} from "react";
import { api } from "../api";
import { Spinner, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';

export function IngredientsPage(){
  const { slug } = useParams();
  const [slugs, setSlugs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [ingredientss, setIngredients] = useState([]);



  useEffect(() => {
    setLoading(true);

    api.get('/recipes')
    .then((res) =>{
      const recipes = res.data.map((recipe) => recipe.slug);
      setSlugs(recipes);
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));;

  }, [slug]);

  useEffect(() => {
    setIngredients(foo());


  }, [slugs]);

  const foo = () => {
    const a = new Set();

    slugs.map((slug) => {
      api.get(`/recipes/${slug}`)
      .then((response) => {
        if (response.data.ingredients !== undefined){
          response.data.ingredients.map((ingredient) => {
            a.add(ingredient.name);
          })
        }
      })
    })
    return a;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }


  // console.log(ingredientss);


  return (
    <div>{ingredientss?.forEach((ingredient) => (
      <p>{ingredient}</p>
    ))}
    </div>
  );
}
