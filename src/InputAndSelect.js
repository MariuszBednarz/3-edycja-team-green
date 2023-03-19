import React from "react";
import  FloatingActionButtonSize from "./FloatingActionButtonSize"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';



function InputAndSelect({
  value,
  handleChange,
  onOptionChangeHandler,
  handleOnKeyDown,
  handleClick,
}) {
  const options = ["Low", "Medium", "High"];

  return (

    <div className="top">
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Zadanie" variant="outlined" 
          className="main-input"
          onChange={handleChange}
          value={value}
          onKeyDown={handleOnKeyDown}/>
    </Box>


<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Priority
        </InputLabel>
        <NativeSelect
        onChange={onOptionChangeHandler}
          defaultValue={"Low"} >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>)})}
        </NativeSelect>
      </FormControl>
    </Box>
      <span  onClick={handleClick}>
      <FloatingActionButtonSize />
      </span>
    </div>

  );
}

export default InputAndSelect;



