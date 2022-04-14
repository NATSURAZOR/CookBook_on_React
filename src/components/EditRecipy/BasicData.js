import React from "react";
import "./BasicData.css";

export function BasicData({newRecipe, setNewRecipe}){

  const updateRecipePreparationTime = (e) => {
    if (newRecipe.preparationTime === undefined){
      const updateRec = newRecipe;
      updateRec.preparationTime = 0;
      setNewRecipe(updateRec);

    }

    if (e.target.value === ""){
      setNewRecipe({...newRecipe, preparationTime: ""});
      return
    }

    if (e.target.valueAsNumber < 0 || e.target.valueAsNumber > 9999){
      setNewRecipe({...newRecipe, preparationTime: newRecipe.preparationTime});
      return
    }

    setNewRecipe({...newRecipe, preparationTime: e.target.valueAsNumber});
  }

  const updateRecipeServingCount = (e) => {
    if (newRecipe.servingCount === undefined){
      const updateRec = newRecipe;
      updateRec.servingCount = 0;
      setNewRecipe(updateRec);
    }

    if (e.target.value === ""){
      setNewRecipe({...newRecipe, servingCount: ""});
      return
    }

    if (e.target.valueAsNumber < 0 || e.target.valueAsNumber > 99){
      setNewRecipe({...newRecipe, servingCount: newRecipe.servingCount});
      return
    }

    setNewRecipe({...newRecipe, servingCount: e.target.valueAsNumber});

  }

  const updateRecipeSideDish = (e) => {
    if (newRecipe.sideDish === undefined){
      const updateRec = newRecipe;
      updateRec.sideDish = "";
      setNewRecipe(updateRec);
    }

    setNewRecipe({...newRecipe, sideDish: e.target.value});
  }

  return (
    <div className="EditRecipy-basic-data">
    <fieldset>
      <legend><h3>Basic data</h3></legend>
      <div className="EditRecipy-preparationTime">
        <label htmlFor="preparationTime">Preparation Time</label>
        <input id="preparationTime" type="number" min="0" max="999"  value={newRecipe.preparationTime === undefined ? "" : newRecipe.preparationTime} onChange={updateRecipePreparationTime} />
        <span>min</span>
      </div>
      <div className="EditRecipy-NumberOfServings">
        <label htmlFor='NumberOfServings'>Number of servings</label>
        <input id="NumberOfServings" type="number" min="1" max="999" value={newRecipe.servingCount === undefined ? "" : newRecipe.servingCount} onChange={updateRecipeServingCount} />
      </div>
      <div className="EditRecipy-topping">
        <label htmlFor="toping">Toping</label>
        <input id="toping" type="text" maxLength="20" value={newRecipe.sideDish === undefined ? "" : newRecipe.sideDish} onChange={updateRecipeSideDish} s/>
      </div>
    </fieldset>
  </div>
  );
}
