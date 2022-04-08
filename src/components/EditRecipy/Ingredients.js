import React from "react";
import { useState } from 'react';

export function Ingredients({newRecipe, setNewRecipe}){
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: '',
    amountUnit: ""
  })

  const [newGroup, setNewGroup] = useState({
    name: ''
  })

  function deleteIngredient(id){
    const newList = newRecipe.ingredients.filter((ingredient) => ingredient._id !== id);
    setNewRecipe({...newRecipe, ingredients: newList});
  }

  function addIngredient(){
    const newList = newRecipe.ingredients;

    newList.push(newIngredient);

    setNewRecipe({...newRecipe, ingredients: newList});

    setNewIngredient({
      name: "",
      amount: '',
      amountUnit: ""
    })
  }

  function addGroup(){
    const newList = newRecipe.ingredients;

    newList.push(newGroup);

    setNewRecipe({...newRecipe, ingredients: newList});

    setNewGroup({
      _id: '',
      name: ''
    })

  }

  return (
    <div className="EditRecipy-ingredients">
      <fieldset>
        <legend>Ingredients</legend>
        <div className="EditRecipy-listOfIngredients">
          <ul>
          {newRecipe.ingredients?.map((ingredient) => (
            <li key={ingredient._id}>
              <button type="button" onClick={() => deleteIngredient(ingredient._id)}>del</button>
              <p>{ingredient.amount}</p>
              <p>{ingredient.amountUnit}</p>
              <p>{ingredient.name}</p>
            </li>
          ))}
          </ul>
        </div>
        <div className="EditRecipy-addIngredient">
          <h3>Add ingredient</h3>
          <div>
          <input type="number" min="1" max="99" placeholder="Count" value={newIngredient.amount } onChange={e => setNewIngredient({...newIngredient, amount: e.target.valueAsNumber})} />
          <input type="text" maxlenght="20" placeholder="Type" value={newIngredient.amountUnit} onChange={e => setNewIngredient({...newIngredient, amountUnit: e.target.value})} />
          </div>
          <div>
          <input type="text" maxlenght="30" placeholder="Name" value={newIngredient.name} onChange={e => setNewIngredient({...newIngredient, name:e.target.value})} />
          <button  type="button" onClick={addIngredient}>Add</button>
          </div>
        </div>
        <div className="EditRecipy-AddAGroup ">
          <h3>Add Group</h3>
          <div>
            <input type="text" maxlenght="30" placeholder="Group name" value={newGroup.name } onChange={e => setNewGroup({...newGroup, name: e.target.value})} />
            <button type="button" onClick={addGroup} >Add</button>
          </div>
        </div>
      </fieldset>

    </div>
  );
}
