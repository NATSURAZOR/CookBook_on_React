import { useState } from "react";
import { api } from '../api';
import { Link } from 'react-router-dom';
import { BasicData } from "../components/EditRecipy/BasicData";
import { Ingredients } from "../components/EditRecipy/Ingredients";
import { Method } from "../components/EditRecipy/Method";
import { MethodPreview } from "../components/EditRecipy/MethodPreview";

export function NewRecept(){
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    directions: "",
    ingredients: [],
    preparationTime: 0,
    servingCount: "",
  })

  const createNewRecipe = () => {
    api.post(`/recipes/${newRecipe._id}`, newRecipe)
  }

  const updateRecipeTitle = (e) => {
    setNewRecipe({...newRecipe, title:e.target.value})
  }
  console.log(newRecipe);

  return (
    <div>
    <form>
      <h1>{newRecipe.title !== "" ? newRecipe.title : "Recipe Name"}</h1>
      <input type="text" value={newRecipe.title} onChange={updateRecipeTitle} required />
      <span hidden={newRecipe.title === ""? false : true}>*Recipe Name can't be empty</span>
      <Link to={`/`} >
      <button disabled={newRecipe.title === "" ? true : false} onClick={createNewRecipe}>Save</button>
      </Link>
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
