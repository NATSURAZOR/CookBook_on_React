import React from "react";

export function MethodPreview({newRecipe}){

  return (
  <div className="MethodPreview-section">
    <h1>Method Preview</h1>
    <p>{newRecipe.directions}</p>
  </div>
  );
}
