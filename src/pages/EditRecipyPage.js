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
import { useNavigate } from "react-router-dom";

export function EditRecipy(){
  const { slug } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [newRecipe, setNewRecipe] = useState({});
  const [startTitle, setStartTitle] = useState("");
  const navigate = useNavigate();

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
  }, []);


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Whooops!!!! Something gona wrong</Alert>;
  }


  const udateRecipe = (event) => {

    event.preventDefault();

    api
    .post(`/recipes/${newRecipe._id}`, newRecipe)
    .then((res) =>
      navigate(`/recipes/${res.data.slug}`, { replace: true })
    )
    .catch((error) => setError(error));
  }

  const updateRecipeTitle = (e) => {
    setNewRecipe({...newRecipe, title:e.target.value})
  }

  return (
    <div className="EditRecipe-section">
    <form >

      <div className="EditRecipe-header">
        <div className="EditRecipe-header-RecipeTitle">
          <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
          <input type="text" value={newRecipe.title} onChange={updateRecipeTitle } required />
          <span hidden={newRecipe.title !== ""}>*Recipe Name can't be empty</span>
          <span hidden={newRecipe.title !== startTitle}>*Recipe Name need to change</span>
         </div>
         <div className="EditRecipe-header-buttons-Save-delete">
          <button disabled={newRecipe.title === "" || newRecipe.title === startTitle } onClick={udateRecipe}>Save</button>
          <Link to={`/recipes/${slug}`} >
            <button>Decline</button>
          </Link>
        </div>
      </div>
      <div className="EditRecipe-body">
        <div className="EditRecipe-body-threeElemts">
        <BasicData newRecipe={newRecipe} setNewRecipe={setNewRecipe}  />
        <Ingredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        <Method newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        </div>
      <div className="EditRecipe-body-forhElemnt">
        <MethodPreview newRecipe={newRecipe} />
      </div>
      </div>
    </form>
    </div>
  );
}
