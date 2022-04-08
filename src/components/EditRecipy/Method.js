import React from "react";

export function Method({newRecipe, setNewRecipe}){


  return (
      <div>
        <fieldset>
          <legend><h3>Method</h3></legend>
          <div>
            <textarea rows="20" value={newRecipe.directions} onChange={e => setNewRecipe({...newRecipe, directions:e.target.value})}></textarea>
          </div>
        </fieldset>
      </div>
  );
}
