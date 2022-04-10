import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'reactstrap';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { Link } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';

import "./RecipeListPage.css";

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState('');

  let filterredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((res) => setRecipes(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(recipes);

  const sortRecipesbyPreparationTimeFromsSmallest = (event) => {
    event.preventDefault();

    setRecipes(recipes.sort((a,b) =>
      (a.preparationTime === undefined ? 9999 : a.preparationTime) - (b.preparationTime === undefined ? 9999 : b.preparationTime)
    ));
  }

  const sortRecipesbyPreparationTimeFromsBiggest = (event) => {
    event.preventDefault();

    setRecipes(recipes.sort((a,b) =>
    (b.preparationTime === undefined ? 9999 : b.preparationTime) - (a.preparationTime === undefined ? 9999 : a.preparationTime)
    ));
  }

  return (
    <div className='RecipeListPage-section'>
      <div className='RecipeListPage-header'>
        <div className='RecipeListPage-header-Recipe'>
          <div className='RecipeListPage-Reipe-records' >
          <h1>Recipes</h1>
          <h5>Aviable records: {recipes.length} </h5>
          <div className='RecipeListPage-underHeader-searchButton'>
            <SearchInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
          </div>
          <div className='RecipeListPage-Filter-section'>
          {/* <select>
          <option>Filter</option>
          <option onClick={sortRecipesbyPreparationTimeFromsSmallest}>Preparation Time Smallest - Biggest</option>
          <option onClick={sortRecipesbyPreparationTimeFromsBiggest}>Preparation Time Biggest - Smallest</option>
          </select> */}

          <button onClick={sortRecipesbyPreparationTimeFromsSmallest}>Preparation Time Smallest - Biggest</button>
          <button onClick={sortRecipesbyPreparationTimeFromsBiggest}>Preparation Time Biggest - Smallest</button>
          </div>
        </div>
        <div className='RecipeListPage-header-button-link'>
          <Link to={"/new-recipe"} >
            <button  className='RecipeListPage-header-newRecipeButton'>New Recipe</button>
          </Link>
        </div>
      </div>
      {isLoading && <Spinner className="mb-4" />}
      {error && (
        <Alert color="danger">Whooops!!!! Something gona wrong</Alert>
      )}
      <RecipesList recipes={filterredRecipes} />
    </div>
  );
}
