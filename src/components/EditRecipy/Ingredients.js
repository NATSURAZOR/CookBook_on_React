import React from "react";
import { useState } from 'react';

export function Ingredients({recipe}){
  console.log(recipe);
  let ingredients = recipe.ingredients;
  console.log(ingredients);


  return (
    <div className="EditRecipy-ingredients">
      <fieldset>
        <legend>Ingredients</legend>
        <div className="EditRecipy-listOfIngredients">
          <ul>
          {ingredients?.map((ingredient) => (
            <li key={ingredient._id}>
              <button  >del</button>
              <p>{ingredient.amount}</p>
              <p>{ingredient.amountUnit}</p>
              <p>{ingredient.name}</p>
            </li>
          ))}
          </ul>
        </div>
        <div className="EditRecipy-addIngredient">
          <h3>Add ingredient</h3>
          <div>
          <input type="number" min="1" max="99" placeholder="Count"></input>
          <input type="text" maxLenght="20" placeholder="Type"></input>
          </div>
          <div>
          <input type="text" maxLenght="30" placeholder="Name"></input>
          <button>Add</button>
          </div>
        </div>
        <div className="EditRecipy-AddAGroup ">
          <h3>Add Group</h3>
          <div>
            <input type="text" maxLenght="30" placeholder="Group name"></input>
            <button>Add</button>
          </div>
        </div>
      </fieldset>

    </div>
  );
}
