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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        p: { xs: 0.5, sm: 0.5, md: 0.75 },
        bgcolor: colour,
      }}
    >
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.775rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Label;
