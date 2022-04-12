import { Link } from 'react-router-dom';
import placeholder from '../images/food-placeholder.png';

import "./RecipeCard.css";

export function RecipeCard({ title, preparationTime, slug, sideDish }) {

  function convertPreparatonTime(){
    const hours = preparationTime / 60;
    const minutes = preparationTime % 60;

    if (preparationTime === 0 || preparationTime === undefined){
      return "Not added time";
    }

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
    <div className='RecipeCard-section'>
      <Link to={`/recipes/${slug}`}>
      <div className='RecipeCard-image'>
        <img src={placeholder} alt="Preview" />
      </div>
      <div className='RecipeCard-bodyText'>
        <h2>{title}</h2>
        <p>{convertPreparatonTime()} {sideDish}</p>
      </div>
      </Link>
    </div>

  );
}
