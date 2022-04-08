import React from "react";


export function BasicData({newRecipe, setNewRecipe}){


  return (
    <div className="EditRecipy-basic-data">
    <fieldset>
      <legend>Basic data</legend>
      <div className="EditRecipy-preparationTime">
        <label htmlFor="preparationTime">Preparation Time</label>
        <input id="preparationTime" type="number" min="1" max="999"  value={newRecipe.preparationTime} onChange={e => setNewRecipe({...newRecipe, preparationTime:e.target.valueAsNumber})} />
        <span>min</span>
      </div>
      <div className="EditRecipy-NumberOfServings">
        <label htmlFor='NumberOfServings'>Number of servings</label>
        <input id="NumberOfServings" type="number" min="1" max="999" value={newRecipe.servingCount} onChange={e => setNewRecipe({...newRecipe, servingCount:e.target.valueAsNumber})} />
      </div>
      <div className="EditRecipy-topping">
        <label htmlFor="toping">Toping</label>
        <input id="toping" type="text" maxLength="20" />
      </div>
    </fieldset>
  </div>
  );
}
