import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <div className='RecipeList-section'>
      {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            slug={recipe.slug}
            sideDish={recipe.sideDish}
          />
      ))}
    </div>
  );
}
