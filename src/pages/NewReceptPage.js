import { useState } from "react";
import { api } from '../api';
import { Link } from 'react-router-dom';
import { BasicData } from "../components/EditRecipy/BasicData";
import { Ingredients } from "../components/EditRecipy/Ingredients";
import { Method } from "../components/EditRecipy/Method";
import { MethodPreview } from "../components/EditRecipy/MethodPreview";
import { Alert} from 'reactstrap';
import { useNavigate } from "react-router-dom";

export function NewRecept(){
  const [error, setError] = useState();
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    directions: "",
    ingredients: [],
    preparationTime: 1,
    servingCount: "",
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

  console.log(newRecipe);

  return (
    <div>
    <form>
      <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
      <input type="text" value={newRecipe.title} onChange={updateRecipeTitle} required />
      <span hidden={newRecipe.title === ""? false : true}>*Recipe Name can't be empty</span>
      <button disabled={newRecipe.title === "" ? true : false} onClick={createNewRecipe}>Save</button>
      <Link to={`/`} >
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
