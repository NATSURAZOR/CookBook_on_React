import React from "react";

export function MethodPreview({newRecipe}){

  return (
  <div>
    <h3>Method Preview</h3>
    <p>{newRecipe.directions}</p>
  </div>
  );
}
