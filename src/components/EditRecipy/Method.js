import React from "react";
import { useState } from 'react';

export function Method({recipe}){
  const [methodOfCooking, setMethodOfCooking ]= useState(recipe.directions);

  const updateMethod = (e) => {
    setMethodOfCooking(e.target.value);
  }

  return (
      <div>
        <fieldset>
          <legend>Method</legend>
          <div>
            <textarea rows="20" value={methodOfCooking} onChange={updateMethod}></textarea>
          </div>
        </fieldset>
      </div>
  );
}
