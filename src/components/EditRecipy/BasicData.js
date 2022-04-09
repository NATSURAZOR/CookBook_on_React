import React from "react";

export function BasicData({newRecipe, setNewRecipe}){

  const updateRecipePreparationTime = (e) => {
    if (e.target.value === ""){
      setNewRecipe({...newRecipe, preparationTime: ""});
      return
    }

    if (e.target.valueAsNumber < 0){
      setNewRecipe({...newRecipe, preparationTime: newRecipe.preparationTime});
      return
    }

    setNewRecipe({...newRecipe, preparationTime:e.target.valueAsNumber});
  }

  const updateRecipeServingCount = (e) => {
    if (e.target.value === ""){
      setNewRecipe({...newRecipe, servingCount: ""});
      return
    }

    if (e.target.valueAsNumber < 0){
      setNewRecipe({...newRecipe, servingCount: newRecipe.servingCount});
      return
    }

    setNewRecipe({...newRecipe, servingCount:e.target.valueAsNumber})
  }

  return (
    <div className="EditRecipy-basic-data">
    <fieldset>
      <legend><h3>Basic data</h3></legend>
      <div className="EditRecipy-preparationTime">
        <label htmlFor="preparationTime">Preparation Time</label>
        <input id="preparationTime" type="number" min="1" max="999"  value={newRecipe.preparationTime} onChange={updateRecipePreparationTime} />
        <span>min</span>
      </div>
      <div className="EditRecipy-NumberOfServings">
        <label htmlFor='NumberOfServings'>Number of servings</label>
        <input id="NumberOfServings" type="number" min="1" max="999" value={newRecipe.servingCount} onChange={updateRecipeServingCount} />
      </div>
      <div className="EditRecipy-topping">
        <label htmlFor="toping">Toping</label>
        <input id="toping" type="text" maxLength="20" />
      </div>
    </fieldset>
  </div>
  );
}
