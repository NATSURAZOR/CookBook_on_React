
import React from "react";
import { useState } from 'react';
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import "./Ingredients.css";

export function Ingredients({newRecipe, setNewRecipe}){
  const [newIngredient, setNewIngredient] = useState({
    isGroup: false,
    name: "",
    amount: "",
    amountUnit: ""
  })

  const [newGroup, setNewGroup] = useState({
    isGroup: true,
    name: ""
  })

  const deleteIngredient = (id) => {
    const newList = newRecipe.ingredients.filter((ingredient) => ingredient._id !== id);
    setNewRecipe({...newRecipe, ingredients: newList});
  }

  const addIngredient = () => {
    if (newRecipe.ingredients === undefined){
      const updateRec = newRecipe;
      updateRec.ingredients = [];
      setNewRecipe(updateRec);
    }

    const newList = newRecipe.ingredients;

    newList.push(newIngredient);

    setNewRecipe({...newRecipe, ingredients: newList});

    setNewIngredient({
      isGroup: false,
      name: "",
      amount: '',
      amountUnit: ""
    })
  }

  const addGroup = () => {
    if (newRecipe.ingredients === undefined){
      const updateRec = newRecipe;
      updateRec.ingredients = [];
      setNewRecipe(updateRec);
    }

    const newList = newRecipe.ingredients;

    newList.push(newGroup);

    setNewRecipe({...newRecipe, ingredients: newList});

    setNewGroup({
      isGroup: true,
      name: ''
    })
  }

  const updateIngredientCount = (e) => {

    if (e.target.value === ""){
      setNewIngredient({...newIngredient, amount: ""});
      return
    }


    if (e.target.valueAsNumber < 0){
      return
    }

    setNewIngredient({...newIngredient, amount: e.target.valueAsNumber});
  }

  const updateIngredientAmountUnit = (e) => {
    setNewIngredient({...newIngredient, amountUnit: e.target.value})
  }

  const updateIngredientName = (e) => {
    setNewIngredient({...newIngredient, name:e.target.value})
  }


  const whichTypeOfIngredient = (ingredient, index) => {
    console.log(index);
    if(ingredient.isGroup){
      return (
        <div className="EditRecipy-group">
        <div className="EditRecipy-listOfIngredients-button-group">
          <button type="button" onClick={() => deleteIngredient(ingredient._id)}><FontAwesomeIcon icon={faTrashAlt} /> </button>
        </div>
        <div className="EditRecipy-listOfIngredients-GroupName">
              <p>{ingredient.name}</p>
        </div>
        </div>
      );
    }

    return (
      <>

        <div className="EditRecipy-listOfIngredients-button">
          <button type="button" onClick={() => deleteIngredient(ingredient._id)}><FontAwesomeIcon icon={faTrashAlt} /> </button>
        </div>
        <div className="EditRecipy-listOfIngredients-amount">
          <p>{ingredient.amount}</p>
        </div>
        <div className="EditRecipy-listOfIngredients-amountUnit">
         <p>{ingredient.amountUnit}</p>
        </div>
        <div className="EditRecipy-listOfIngredients-name">
          <p>{ingredient.name}</p>
        </div>
        </>
    );
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(newRecipe.ingredients);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNewRecipe({...newRecipe, ingredients:items});
  }

  return (
    <div className="EditRecipy-ingredients">
      <fieldset>
        <legend><h1>Ingredients</h1></legend>
        <div className="EditRecipy-listOfIngredients">
          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="ingredients">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {newRecipe.ingredients?.map((ingredient, index) => {
                    return (
                      <Draggable key={ingredient._id} draggableId={ingredient._id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="EditRecipy-listOfIngredients-ingredient" key={ingredient._id}>
                              {whichTypeOfIngredient(ingredient, index)}
                          </li>
                        )}
                        </Draggable>
                    );}
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="EditRecipy-addIngredient">
          <h3>Add ingredient</h3>
          <div className="EditRecipy-addIngredient-inputs">
          <input className="EditRecipy-addIngredient-input-amount" type="number" min="1" max="99" placeholder="Count" value={newIngredient.amount } onChange={updateIngredientCount} />
          <input className="EditRecipy-addIngredient-input-amountUnit" type="text" maxlenght="20" placeholder="Type" value={newIngredient.amountUnit} onChange={updateIngredientAmountUnit} />
          </div>
          <div className="EditRecipy-addIngredient-name-section">
          <input className="EditRecipy-addIngredient-name-input" type="text" maxlenght="30" placeholder="Name" value={newIngredient.name} onChange={updateIngredientName} />
          <button className="EditRecipy-addIngredient-add-button" type="button" disabled={newIngredient.name === "" ? true : false} onClick={addIngredient}><FontAwesomeIcon icon={faPlus} />      Add</button>
          </div>
        </div>
        <div className="EditRecipy-AddAGroup ">
          <h3>Add Group</h3>
          <div className="EditRecipy-AddAGroup-input-button">
            <input className="EditRecipy-addIngredient-name-input" type="text" maxlenght="30" placeholder="Group name" value={newGroup.name } onChange={e => setNewGroup({...newGroup, name: e.target.value})} />
            <button className="EditRecipy-addIngredient-add-button" type="button" disabled={newGroup.name === "" ? true : false} onClick={addGroup} ><FontAwesomeIcon icon={faPlus} />      Add</button>
          </div>
        </div>
      </fieldset>

    </div>
  );
}

