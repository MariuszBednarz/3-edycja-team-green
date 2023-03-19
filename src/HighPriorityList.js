import React from "react";

function HighPriorityList(props) {
  const { items } = props;

  const highPriorityItems = items.filter((item) => item.isHigh);

  return (
    <span>
      <h2 className="high-priority-h2">High Priority List:</h2>
      
        {highPriorityItems.map((item) => (
          <li key={item.id} className="high-priority">
        {!item.isCompleted ? item.value : null}
          </li>
        ))}
    
    </span>
  );
}

export default HighPriorityList;