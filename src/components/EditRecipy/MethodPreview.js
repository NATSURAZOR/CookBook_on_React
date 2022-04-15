import React from "react";
import ReactMarkdown from "react-markdown";

export function MethodPreview({newRecipe}){

  return (
  <div className="MethodPreview-section">
    <h1>Method Preview</h1>
    <ReactMarkdown className='reactmarckDown'>{newRecipe.directions}</ReactMarkdown>
  </div>
  );
}
