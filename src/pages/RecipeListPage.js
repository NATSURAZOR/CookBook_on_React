import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'reactstrap';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { Link } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RecipeListPage.css";

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState(1);
  const [filterButtons, setFilterButtons] = useState(false);

  const filterredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((res) => {
        if(filter === 1){
          setRecipes(res.data);
        }
        if (filter === 2){
          sortRecipesbyPreparationTimeFromsSmallest(res.data);
        }
        if(filter === 3){
          sortRecipesbyPreparationTimeFromsBiggest(res.data);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));



  }, [filter]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  const sortRecipesbyPreparationTimeFromsSmallest = (recipess) => {

    setRecipes(recipess.sort((a,b) =>
      (a.preparationTime === undefined ? 9999 : a.preparationTime) - (b.preparationTime === undefined ? 9999 : b.preparationTime)
    ));


  }

  const sortRecipesbyPreparationTimeFromsBiggest = (recipess) => {

    setRecipes(recipess.sort((a,b) =>
    (b.preparationTime === undefined ? 9999 : b.preparationTime) - (a.preparationTime === undefined ? 9999 : a.preparationTime)
    ));

  }

  const fooSetFilter = () => {
    setFilter(2);
  }

  const fooSetFilter2 = () => {
    setFilter(3);
  }

  const foooooo = () => {
    setFilterButtons(!filterButtons);
  }

  return (
    <div className='RecipeListPage-section'>
      <div className='RecipeListPage-header'>
          <div className='RecipeListPage-Reipe-records' >
          <h1>Recipes</h1>
          <h5>Aviable records: {recipes.length} </h5>
        </div>
          <div className='RecipeListPage-underHeader-searchButton'>
            <SearchInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
        />
        </div>
        <div className='RecipeListPage-header-button-link'>
          <Link to={"/new-recipe"} >
            <button  className='button-green'><FontAwesomeIcon icon={faUtensils} />    New Recipe</button>
          </Link>
        </div>
      </div>
      <div className='RecipeListPage-Filter-section'>
          <button className='RecipeListPage-Filter-sortingButton' hidden={filterButtons === true} onClick={foooooo}>Sorting</button>
          <button className='RecipeListPage-Filter-sortingButton-active' hidden={filterButtons === false}  onClick={foooooo}>Sorting</button>

          <div className='RecipeListPage-Filter-2buttons' hidden={filterButtons === false}>
             <button className='RecipeListPage-Filter-smallest' onClick={fooSetFilter}>Preparation Time Smallest - Biggest</button>
             <button className='RecipeListPage-Filter-biggest' onClick={fooSetFilter2}>Preparation Time Biggest - Smallest</button>
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
