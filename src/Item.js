import React from "react";
import BasicRating from "./components/BasicRating";

function Item({
items,
markAsCompleted, 
removeItem, 
dateOfDone,
CheckIcon,
DeleteForeverIcon,
Dating,
BasicRating,

}) {


  return (
    <>
    <ul className="first-list">
      <h2 className="regular-priority-h2">Low priority list</h2>
      
            {items.map((item, index) => (
              
            <li
            key={item.id}
            id={index} >
              <div className="element-of-list">
                  <span className={item.isCompleted ? "text-strike" : null}>
                    {item.value}
                  </span>
                    <CheckIcon onClick={() => markAsCompleted(item.id)} />
                    <DeleteForeverIcon onClick={() => removeItem(item.id)} />
                    Utworzono: <Dating />
                  <span className="done">
                      {item.isCompleted ? dateOfDone() : null}
                  </span>
                  <span className="rating">{item.isCompleted ? <BasicRating /> : null}</span>

              </div>
                  
             </li>
      
    ))}
            </ul>
            </>

  )}
  
export default Item;