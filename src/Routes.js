import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { EditRecipy } from './pages/EditRecipyPage';
import { NewRecept } from './pages/NewReceptPage';
import { SidedishesPage } from './pages/Side-dishesPage';
import { IngredientsPage } from './pages/IngredientsPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/new-recipe" element={<NewRecept />} />
      <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
      <Route path="/recipes/:slug/upravit" element={<EditRecipy />} />
      <Route path="/recipes/ingredients" element={<IngredientsPage />} />
      <Route path="/recipes/side-dishes" element={<SidedishesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
