import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'reactstrap';

import { api } from '../api';
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import { Link } from 'react-router-dom';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState('');

  const filterredRecipes = recipes.filter((recipe) =>
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

  return (
    <Container>
      <h1>Recipes</h1>
      <h5>Aviable records: {recipes.length} </h5>
      <Link to={"/new-recipe"} >
        <button>New Recipe</button>
      </Link>
      <SearchInput
        className="mb-4"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {isLoading && <Spinner className="mb-4" />}
      {error && (
        <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>
      )}
      <RecipesList recipes={filterredRecipes} />
    </Container>
  );
}
