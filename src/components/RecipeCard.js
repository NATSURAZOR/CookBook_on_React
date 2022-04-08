import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';

export function RecipeCard({ title, preparationTime, slug, sideDish }) {

  function converPreparatonTime(){
    const hours = preparationTime / 60;
    const minutes = preparationTime % 60;

    let result = "";

    if (hours >= 1 ){
      result  =  parseInt(hours) + " h ";
    }

    if (minutes !== 0){
      result += minutes + " min";
    }

    return result;
  }


  return (
    <Card className="h-100">
      <Link to={`/recipes/${slug}`}>
        <CardImg src={placeholder} alt="Preview" top />

      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{converPreparatonTime()} {sideDish}</CardSubtitle>
      </CardBody>
      </Link>
    </Card>
  );
}
