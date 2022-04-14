import React from "react";

export function Method({newRecipe, setNewRecipe}){
  const updateDirections = (e) => {
    if (newRecipe.directions === undefined){
      const updateRec = newRecipe;
      updateRec.directions = "";
      setNewRecipe(updateRec);
    }

    setNewRecipe({...newRecipe, directions:e.target.value});
  }

  return (
      <div>
        <fieldset>
          <legend><h3>Method</h3></legend>
          <div>
            <textarea rows="20" value={newRecipe.directions} onChange={updateDirections}></textarea>
          </div>
        </fieldset>
      </div>
  );
}
