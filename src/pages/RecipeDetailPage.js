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

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => setRecipe(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, [slug]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  console.log(recipe);

  return (
    <div>
      <div>
        <Link to={`/recipes/${slug}/upravit`} >
          <button>Update</button>
        </Link>
        <Link to={'/'}>
          <button onClick={() => api.delete(`/recipes/${recipe._id}`)} >Delete</button>
        </Link>
        <h1>{recipe.title}</h1>
      </div>
      <div>
          <h5>{recipe.preparationTime} min</h5>
            <div>
            {recipe.ingredients?.map((ingredient) => (
              <li key={ingredient._id}>
                {ingredient.amount} {ingredient.amountUnit} - {ingredient.name}
              </li>
            ))}
          </div>
        </div>
        <div>
          <p>{recipe.directions}</p>
        </div>
        <div>
          <h3>Last Changes:</h3>
          <h4>{recipe.lastModifiedDate.split("T")[0]}</h4>
        </div>
      </div>

  );
}
