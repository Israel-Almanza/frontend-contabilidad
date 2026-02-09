// components/Tooth.tsx
import React from 'react';
import { Box } from '@mui/material';

const Tooth = ({ number, selected, onClick }: {
  number: number,
  selected: boolean,
  onClick: () => void
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 50,
        height: 70,
        cursor: 'pointer',
        border: selected ? '2px solid #3f51b5' : '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: selected ? '#e3f2fd' : '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Aquí va un SVG simple de un diente */}
      <svg viewBox="0 0 64 64" width="30" height="40" fill={selected ? '#3f51b5' : '#555'}>
        <path d="M32 2C22 2 20 18 20 26s2 18 2 26c0 2 2 4 4 4s4-2 4-4V42h4v10c0 2 2 4 4 4s4-2 4-4c0-8 2-18 2-26s-2-24-12-24z"/>
      </svg>
      <small>{number}</small>
    </Box>
  );
};

export default Tooth;
