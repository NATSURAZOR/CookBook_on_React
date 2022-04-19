import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert} from 'reactstrap';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { faBowlFood, faClock, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";

import "./RecipeDetailPage.css";

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [newServingCount, setNewServingCount] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => {
        setRecipe(res.data);
        setNewServingCount(res.data.servingCount);
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


  const convertPreparationTime = () =>{
    const hours = recipe.preparationTime / 60;
    const minutes = recipe.preparationTime % 60;

    if (recipe.preparationTime === 0 || recipe.preparationTime === undefined){
      return "Not added time";
    }

    let result = "";

    if (hours >= 1 ){
      result  =  parseInt(hours) + " h ";
    }

    if (minutes !== 0){
      result += minutes + " min";
    }

    return result;
  }

  const ingredientsArray = (ingredients) => {
    if(ingredients?.length === 0){
      return (<div className='RecipeDetailPage-noIngrdients'>No Ingredients.</div>);
    }

    return ( <div className='RecipeDetailPage-Ingredients-box'>
      {ingredients?.map((ingredient) => isGroupOrIngredient(ingredient))}
      </div>
    );
  }

  const updateServingCount = (e) => {
    if (e.target.value === ""){
      setNewServingCount("");
      return
    }

    if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 99){
      return
    }

    setNewServingCount(e.target.valueAsNumber);
  }

  const isGroupOrIngredient = (ingredient) => {
    if (ingredient?.isGroup){

      return (
      <li className='RecipeDetailPage-isIngredients-Group' key={ingredient._id}>
        {ingredient.name}
      </li>
      );
    }

    let ingredientAmount = "";
    let ingredientAmountUnit = "";


    if (ingredient.amount  !== isNaN && ingredient.amount !== undefined){
      if (recipe.servingCount === undefined || recipe.servingCount === isNaN){
        ingredientAmount = ingredient.amount;
      }
      else{
        ingredientAmount = ingredient.amount / recipe.servingCount * newServingCount;
      }
    }

    if(ingredientAmount === 0){
      ingredientAmount = ingredient.amount;
    }

    if (ingredient.amountUnit !== isNaN && ingredient.amountUnit !== undefined){
      ingredientAmountUnit = ingredient.amountUnit;
    }


    return (
      <li className='RecipeDetailPage-isIngredients-ingredient' key={ingredient._id}>
        <div className='RecipeDetailPage-isIngredients-ingredient-ingredientAmount'>
        {ingredientAmount}
        </div >
        <div className='RecipeDetailPage-isIngredients-ingredient-ingredientAmountUnit'>{ingredientAmountUnit}
        </div>
        <div className='RecipeDetailPage-isIngredients-ingredient-ingredientName'> {ingredient.name} </div>
      </li>
    );
  }

  return (
    <div className='RecipeDetailPage-section'>
      <div className='RecipeDetailPage-header-and-buttons'>
        <div className='RecipeDetailPage-recipeTitle'>
        <h1>{recipe.title}</h1>
        </div>
        <div className='RecipeDetailPage-buttons-delete-and-update'>
        <Link to={`/recipes/${slug}/upravit`} >
          <button className='button-green'> <FontAwesomeIcon icon={faPenToSquare} />     Edit</button>
        </Link>
        <Link to={'/'}>
          <button className='button-red' onClick={() => api.delete(`/recipes/${recipe._id}`)} > <FontAwesomeIcon icon={faTrashAlt} />     Delete</button>
        </Link>
        </div>
      </div>
      <div className='RecipeDetailPage-body'>
        <div className='RecipeDetailPage-preparationTime'>
          <h5>
            {convertPreparationTime() === "Not added time" ? "" : <FontAwesomeIcon icon={faClock} /> } {convertPreparationTime()}
            {recipe.sideDish === undefined ? "" : <FontAwesomeIcon icon={faBowlFood} />} {recipe.sideDish}
            </h5>
        </div>
        <div className='RecipeDetailPage-Ingredients-and-Directions'>
          <div className='RecipeDetailPage-Ingredients'>
              <div className='RecipeDetailPage-Ingredient-ServingCount-Section'>
                <span hidden={recipe.ingredients?.length === 0 || recipe.servingCount === undefined}>Serving Count</span>
                <div className='RecipeDetailPage-Ingredient-ServingCount-Section-input'>
                <input hidden={recipe.ingredients?.length === 0 || recipe.servingCount === undefined}
                      type="number" min="1" max="99" value={newServingCount} onChange={updateServingCount} >
                </input>
                </div>
              </div>
              {ingredientsArray(recipe.ingredients)}
          </div>
          <div className='RecipeDetailPage-Directions'>
            <ReactMarkdown className='reactmarckDown' hidden={recipe?.directions?.length < 1}>{recipe.directions}</ReactMarkdown>
            <div className='RecipeDetailPage-Directions-noMethod' hidden={recipe?.directions?.length > 1}>No Method</div>
          </div>
        </div>
          <div className='RecipeDetailPage-lastUpdateTime'>
            <h3>Last Changes:</h3>
            <h4>{recipe.lastModifiedDate?.split("T")[0]}</h4>
          </div>
       </div>
      </div>

  );
}
