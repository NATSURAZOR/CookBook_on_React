import { Row, Col } from 'reactstrap';

import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <Row className="gy-4">
      {recipes.map((recipe) => (
        <Col key={recipe._id} lg={3} md={4} sm={6} xs={12}>
          <RecipeCard
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            slug={recipe.slug}
          />
        </Col>
      ))}
    </Row>
  );
}
