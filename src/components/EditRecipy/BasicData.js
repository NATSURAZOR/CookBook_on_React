import React from "react";
import { useState } from 'react';

export function BasicData({recipe}){
  const [preparationTime, setPreparationTime] = useState(recipe.preparationTime);
  const [numberOfServings, setNumberOfServings] = useState(1);

  const updatePrepTime = (e) => {
    setPreparationTime(e.target.value);
  }

  const updateNumberOfServings = (e) => {
    setNumberOfServings(e.target.value);
  }

  return (
    <div className="EditRecipy-basic-data">
    <fieldset>
      <legend>Basic data</legend>
      <div className="EditRecipy-preparationTime">
        <label htmlFor="preparationTime">Preparation Time</label>
        <input id="preparationTime" type="number" min="1" max="999" value={preparationTime} onChange={updatePrepTime} />
        <span>min</span>
      </div>
      <div className="EditRecipy-NumberOfServings">
        <label htmlFor='NumberOfServings'>Number of servings</label>
        <input id="NumberOfServings" type="number" min="1" max="999" value={numberOfServings} onChange={updateNumberOfServings} />
      </div>
      <div className="EditRecipy-topping">
        <label htmlFor="toping">Toping</label>
        <input id="toping" type="text" maxLength="20" />
      </div>
    </fieldset>
  </div>
  );
}
