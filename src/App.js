import "./App.css";

import { useState, useEffect } from "react";
import { v4 } from "uuid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import BasicRating from "./components/BasicRating";
import HighPriorityList from './HighPriorityList.js';
import Counter from './Counter';
import InputAndSelect from "./InputAndSelect";
import Item from "./Item"
import ToggleColorMode from "./ToggleColorMode"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';







function Dating() {
  const data = new Date()
  const newData = data.toLocaleString()
  return (
    <>
    <span>{newData}</span>
    </>
  )
}






function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [counter, setCounter] = useState(0);
  const [basicRating, setBasicRating] = useState(0)
  



  useEffect(() => {
    const itemsFromLS = localStorage.getItem("items");
    if (itemsFromLS) {
      setItems(JSON.parse(itemsFromLS));
    }
  
    const counterFromLS = localStorage.getItem("counter");
    if (counterFromLS) {
      setCounter(parseInt(counterFromLS));
    }

    const basicRatingFromLS = localStorage.getItem("basicRating");
    if (basicRatingFromLS) {
      setBasicRating(parseInt(basicRatingFromLS)); 
    }
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    if (value !== "") {
      const newItems = [
        ...items, 
        {
          id: v4(),
          value,
          isCompleted: false,
          isHigh: false,
          isMedium: false,
        },
      ];
  
      const selectValue = document.querySelector("select")?.value;
      if (selectValue === "High") {
        newItems[newItems.length - 1].isHigh = true;
      } else if (selectValue === "Medium") {
        newItems[newItems.length - 1].isMedium = true;
      }
  
      setItems(newItems);
      setValue("");
      setCounter(counter => counter + 1);
    }
  };
  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("counter", JSON.stringify(counter));
    localStorage.setItem("basicRating", JSON.stringify(basicRating));

    };

 
  const markAsCompleted = (id) => {
    const index = items.findIndex((item) => item.id === id);
 
    const newItem = {
      ...items[index],
      isCompleted: !items[index].isCompleted,
    };

    const newItems = [...items];
    newItems.splice(index, 1, newItem);
    setItems(newItems);
    
  }

  const dateOfDone = () => {
    const data = new Date()
    const newData = data.toLocaleString()
   const resultData = "Wykonano:" + " " + newData
    return resultData
  }



  const removeItem = (id) => {
    const index = items.findIndex((item) => item.id == id);

    const newItems = [...items];
    
     const newestItems = newItems.filter((e) => e.id !== id)

     setCounter(counter => counter - 1);
    setItems(newestItems);
   
  };

  const onOptionChangeHandler = (event) => {
    if(event.target.value == 'High') {
      console.log("Value - ", event.target.value)
    }
  }

  const mediumPriorityItems = items.filter((item) => item.isMedium);



 
  return (
   
  <div>
      <InputAndSelect 
      value={value}
      handleChange = {handleChange}
      onOptionChangeHandler={onOptionChangeHandler}
      handleOnKeyDown={handleOnKeyDown}
      handleClick={handleClick}/>

      <div className="counter"><Counter count={counter} /></div>
      <div className="bothLists">
    
      <span  className="high-priority-list">
          <HighPriorityList items={items} />
      </span>
      <span>
      <h2 className="medium-priority-h2">Medium Priority List:</h2>
        {mediumPriorityItems.map((item) => (
          <li key={item.id} className="medium-priority">
        {!item.isCompleted ? item.value : null}
          </li>
        ))}
    </span>
      <Item 
      items={items}
      markAsCompleted={markAsCompleted}
      removeItem={removeItem}
      dateOfDone={dateOfDone}
      CheckIcon={CheckIcon}
      DeleteForeverIcon={DeleteForeverIcon}
      Dating={Dating}
      BasicRating={BasicRating}
      />
      </div>
      <div className="save-container">
      <Stack direction="row" spacing={2}>

      <Button 
      variant="contained" 
      href="#contained-buttons"
      onClick={saveToLocalStorage} className="save-button">
        Save
      </Button>
    </Stack>
      </div>

    </div>
  );
}

export default App;


