import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";


export default function BasicRating() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const basicRatingFromLS = localStorage.getItem("value");
    if (basicRatingFromLS) {
      setValue(parseInt(basicRatingFromLS));
    }
  }, []);

  const saveToLocalStorage = (newValue) => {
    setValue(newValue);
    localStorage.setItem("value", newValue);
  };

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Typography component="legend"></Typography>
      <Rating
        name="size-small"
        defaultValue={2}
        size="small"
        value={value}
        onChange={(event, newValue) => {
          saveToLocalStorage(newValue);
        }}
      />
    </Box>
  );
}

