import React from "react";

export function Method({newRecipe, setNewRecipe}){


  return (
      <div>
        <fieldset>
          <legend>Method</legend>
          <div>
            <textarea rows="20" value={newRecipe.directions} onChange={e => setNewRecipe({...newRecipe, directions:e.target.value})}></textarea>
          </div>
        </fieldset>
      </div>
  );
}
