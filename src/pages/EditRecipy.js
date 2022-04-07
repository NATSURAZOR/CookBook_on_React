import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert} from 'reactstrap';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { BasicData } from "../components/EditRecipy/BasicData";
import { Ingredients } from "../components/EditRecipy/Ingredients";
import { Method } from "../components/EditRecipy/Method";
import { MethodPreview } from "../components/EditRecipy/MethodPreview";


export function EditRecipy(){
  const { slug } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    directions: "",
    ingredients: [],
    preparationTime: 0,
    servingCount: ""
  });

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => {
        setNewRecipe(res.data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, [slug]);

  function updateRecepy(){
    api.post(`/recipes/${slug}`).then(newRecipe => newRecipe.json());
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  console.log(newRecipe);

  return (
    <div>
    <form>
      <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
      <input type="text" value={newRecipe.title} onChange={e => setNewRecipe({...newRecipe, title:e.target.value})} required />
      {/* <Link to={`/recipe/${slug}`} > */}
      <button onSubmit={updateRecepy}>Save</button>
      {/* </Link> */}
      <Link to={`/recipe/${slug}`} >
        <button>Decline</button>
      </Link>
      <div>
      <div>
      <BasicData newRecipe={newRecipe} setNewRecipe={setNewRecipe}  />
      <Ingredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
      <Method newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
      </div>
      <div>
        <MethodPreview newRecipe={newRecipe} />
      </div>
      </div>
    </form>
    </div>
  );
}
