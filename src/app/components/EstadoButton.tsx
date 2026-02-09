import React from 'react';
import Button from '@mui/material/Button';
import { green, red } from '@mui/material/colors';


const EstadoButton = ({ estado }) => {
  // Determinar el estilo basado en el estado
  const isActivo = estado === 'ACTIVO';
  const buttonText = isActivo ? 'Activo' : 'Inactivo';
  const buttonColor = isActivo ? green[500] : red[500];

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: buttonColor,
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {buttonText}
    </Button>
  );
};

export default EstadoButton;
