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
  const [newRecipe, setNewRecipe] = useState({});
  const [startTitle, setStartTitle] = useState("");

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => {
        setNewRecipe(res.data);
        setStartTitle(res.data.title);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, [slug]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  console.log(newRecipe);

  const udateRecipe = () => {
    api.post(`/recipes/${newRecipe._id}`, newRecipe)
  }

  const updateRecipeTitle = (e) => {
    setNewRecipe({...newRecipe, title:e.target.value})
  }
  console.log(newRecipe.title);
  console.log(startTitle);

  return (
    <div>
    <form>
      <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
      <input type="text" value={newRecipe.title} onChange={updateRecipeTitle } required />
      <span hidden={newRecipe.title === ""? false : true}>*Recipe Name can't be empty</span>
      <span hidden={newRecipe.title === startTitle ? false : true}>*Recipe Name need to change</span>
      <Link to={`/`} >
      <button disabled={newRecipe.title === "" || newRecipe.title === startTitle ? true : false} onClick={udateRecipe}>Save</button>
      </Link>
      <Link to={`/recipes/${slug}`} >
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
