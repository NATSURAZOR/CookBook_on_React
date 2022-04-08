import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { EditRecipy } from './pages/EditRecipy';
import { NewRecept } from './pages/NewRecept';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/new-recipe" element={<NewRecept />} />
      <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
      <Route path="/recipes/:slug/upravit" element={<EditRecipy />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
