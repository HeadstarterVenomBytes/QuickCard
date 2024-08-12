import React from "react";
import { Typography } from "@mui/material";

interface TypographyHeaderProps {
  title: string;
}

const TypographyHeader: React.FC<TypographyHeaderProps> = ({ title }) => (
  <Typography variant="h4" component="h4" gutterBottom>
    {title}
  </Typography>
);

export default TypographyHeader;
