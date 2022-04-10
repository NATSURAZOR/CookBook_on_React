import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert} from 'reactstrap';
import { Link } from 'react-router-dom';
import { api } from '../api';

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

  function convertPreparationTime(){
    const hours = recipe.preparationTime / 60;
    const minutes = recipe.preparationTime % 60;

    let result = "";

    if (hours >= 1 ){
      result  =  parseInt(hours) + " h ";
    }

    if (minutes !== 0){
      result += minutes + " min";
    }

    return result;
  }

  function ingredientsArray(ingredients) {
    if(ingredients?.length === 0){
      return "No Ingredients.";
    }

    return ingredients?.map((ingredient) => isGroupOrIngredient(ingredient));
  }

  const updateServingCount = (e) => {
    if (e.target.value === ""){
      setNewServingCount("");
      return
    }

    if (e.target.valueAsNumber < 0 || e.target.valueAsNumber > 99){
      return
    }

    setNewServingCount(e.target.valueAsNumber);
  }

  function isGroupOrIngredient(ingredient)  {
    if (ingredient?.isGroup){

      return (
      <li className='RecipeDetailPage-isIngredients-Group' key={ingredient._id}>
        {ingredient.name}
      </li>
      );
    }

    let ingredientAmount = ingredient.amount;

    if (recipe.servingCount !== NaN && recipe.servingCount !== undefined){
        ingredientAmount = ingredientAmount / recipe.servingCount * newServingCount;
    }

    return (
      <li className='RecipeDetailPage-isIngredients-ingredient' key={ingredient._id}>
        {ingredientAmount} {ingredient.amountUnit} - {ingredient.name}
      </li>
    );
  }

  console.log(recipe);

  return (
    <div className='RecipeDetailPage-section'>
      <div className='RecipeDetailPage-header-and-buttons'>
        <div className='RecipeDetailPage-recipeTitle'>
        <h1>{recipe.title}</h1>
        </div>
        <div className='RecipeDetailPage-buttons-delete-and-update'>
        <Link to={`/recipes/${slug}/upravit`} >
          <button className='RecipeDetailPage-button-Update'>Update</button>
        </Link>
        <Link to={'/'}>
          <button className='RecipeDetailPage-button-Delete' onClick={() => api.delete(`/recipes/${recipe._id}`)} >Delete</button>
        </Link>
        </div>
      </div>
      <div className='RecipeDetailPage-body'>
        <div className='RecipeDetailPage-preparationTime'>
          <h5>{convertPreparationTime()}</h5>
        </div>
        <div className='RecipeDetailPage-Ingredients-and-Directions'>
          <div className='RecipeDetailPage-Ingredients'>
              <input hidden={recipe.ingredients?.length === 0 || recipe.servingCount === undefined ? true : false}
                      type="number" min="1" max="99" value={newServingCount} onChange={updateServingCount} ></input>
              {ingredientsArray(recipe.ingredients)}
          </div>
          <div className='RecipeDetailPage-Directions'>
            <p>{recipe.directions === "" || recipe.directions === undefined ? "No Method" : recipe.directions}</p>
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
