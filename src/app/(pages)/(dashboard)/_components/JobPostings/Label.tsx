import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface LabelProps {
  title: string;
  colour?: string;
}

const Label = ({ title, colour }: LabelProps) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        padding: 1,
        bgcolor: colour,
      }}
    >
      <Typography variant="body1" color="text.primary" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Label;
