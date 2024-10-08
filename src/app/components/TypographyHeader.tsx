import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface TypographyHeaderProps
  extends Omit<TypographyProps, "variant" | "component"> {
  title: string;
  variant?: TypographyProps["variant"];
  component?: TypographyProps["component"];
  color?: TypographyProps["color"];
}

const TypographyHeader: React.FC<TypographyHeaderProps> = ({
  title,
  variant = "h4",
  component = "h4",
  color,
  ...otherProps
}) => (
  <Typography
    variant={variant}
    component={component}
    gutterBottom
    color={color}
    {...otherProps}
  >
    {title}
  </Typography>
);

export default TypographyHeader;
