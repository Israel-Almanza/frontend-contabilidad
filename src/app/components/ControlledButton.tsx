import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  color?: string;         // Color personalizado
  hoverColor?: string;    // Hover personalizado
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

const StyledButton = styled(Button)<{ bgcolor: string; hovercolor: string }>(
  ({ bgcolor, hovercolor }) => ({
    backgroundColor: bgcolor,
    color: "white",
    "&:hover": {
      backgroundColor: hovercolor,
    },
    borderRadius: "8px",
    padding: "6px 18px",
    textTransform: "none",
    fontWeight: 600,
  })
);

const ControlledButton = ({
  children,
  onClick,
  type = "button",
  variant = "contained",
  color = "#008000",
  hoverColor = "#0A680A",
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
}: Props) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      bgcolor={color}
      hovercolor={hoverColor}
    >
      {children}
    </StyledButton>
  );
};

export default ControlledButton;
