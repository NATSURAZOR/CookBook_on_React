import { useState } from "react";
import { api } from '../api';
import { Link } from 'react-router-dom';
import { BasicData } from "../components/EditRecipy/BasicData";
import { Ingredients } from "../components/EditRecipy/Ingredients";
import { Method } from "../components/EditRecipy/Method";
import { MethodPreview } from "../components/EditRecipy/MethodPreview";
import { Alert} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NewRecipePage.css";

export function NewRecept(){
  const [error, setError] = useState();
  const [newRecipe, setNewRecipe] = useState({
    title: "",
  });
  let navigate = useNavigate();

  const createNewRecipe = (event) => {
    event.preventDefault();

    api.post(`/recipes`, newRecipe)
    .then((response) => {
      navigate(`/recipes/${response.data.slug}`);
    })
    .catch((error) => setError(error));
  }

  const updateRecipeTitle = (e) => {
    setNewRecipe({...newRecipe, title:e.target.value});
  }

  if (error) {
    return <Alert color="danger">Whooops!!!! Something gona wrong</Alert>;
  }

  return (
    <form className="NewRecipePage">
      <div className="NewRecipePage-header">
        <div className="NewRecipePage-header-title">
            <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
        </div>
        <div className="NewRecipePage-header-buttons">
          <button className="button-green" disabled={newRecipe.title === ""} onClick={createNewRecipe}><FontAwesomeIcon icon={faSave} />     Save</button>
          <Link to={`/`} >
            <button className="button-red" > <FontAwesomeIcon icon={faTrashAlt} />     Decline</button>
          </Link>
        </div>
      </div>
      <fieldset className="NewRecipePage-title-input-section">
        <input className="NewRecipePage-title-input" type="text" value={newRecipe.title} onChange={updateRecipeTitle} required />
        <span className="NewRecipePage-title-wrong" hidden={newRecipe.title !== ""}>*Recipe Name can't be empty</span>
      </fieldset>
      <div className="NewRecipePage-body-3items">
        <BasicData newRecipe={newRecipe} setNewRecipe={setNewRecipe}  />
        <Ingredients newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        <Method newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
      </div>
      <div className="NewRecipePage-body-item4">
        <MethodPreview newRecipe={newRecipe} />
      </div>
    </form>
  );
}
