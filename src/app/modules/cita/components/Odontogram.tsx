import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Tooth from './Tooth'; // Tu componente SVG de diente

// Posiciones de los dientes SVG en forma de arco circular (superior e inferior)


const toothSvgPositions = [
  // Arco superior (más pronunciado)
  { number: 18, x: 0, y: 120 }, { number: 17, x: 30, y: 80 }, { number: 16, x: 65, y: 50 }, { number: 15, x: 105, y: 30 },
  { number: 14, x: 140, y: 15 }, { number: 13, x: 180, y: 5 }, { number: 12, x: 220, y: 0 }, { number: 11, x: 260, y: -5 },

  { number: 21, x: 300, y: -5 }, { number: 22, x: 340, y: 0 }, { number: 23, x: 380, y: 5 }, { number: 24, x: 420, y: 15 },
  { number: 25, x: 460, y: 30 }, { number: 26, x: 500, y: 50 }, { number: 27, x: 530, y: 80 }, { number: 28, x: 575, y: 120 },

  // Arco inferior (más pronunciado)
  { number: 38, x: 0, y: 260 }, { number: 37, x: 30, y: 290 }, { number: 36, x: 65, y: 310 }, { number: 35, x: 105, y: 325 },
  { number: 34, x: 140, y: 340 }, { number: 33, x: 180, y: 350 }, { number: 32, x: 220, y: 355 }, { number: 31, x: 260, y: 360 },

  { number: 41, x: 300, y: 360 }, { number: 42, x: 340, y: 355 }, { number: 43, x: 380, y: 350 }, { number: 44, x: 420, y: 340 },
  { number: 45, x: 460, y: 325 }, { number: 46, x: 500, y: 310 }, { number: 47, x: 530, y: 290 }, { number: 48, x: 575, y: 260 },
];



// Posiciones en la imagen del cráneo
const skullToothPositions = [
  { number: 11, top: 150, left: 125 },
  { number: 21, top: 150, left: 175 },
  { number: 31, top: 200, left: 135 },
  { number: 41, top: 320, left: 165 },
  // Puedes añadir más...
];

// Overlay que se ilumina sobre el cráneo
const ToothOverlay = ({ top, left, active }: { top: number; left: number; active: boolean }) => (
  <Box
    sx={{
      position: 'absolute',
      top,
      left,
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: active ? 'yellow' : 'transparent',
      border: active ? '2px solid orange' : 'none',
      transform: 'translate(-50%, -50%)',
      transition: '0.3s',
      pointerEvents: 'none',
    }}
  />
);

const Odontogram = () => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      gap={4}
      mt={4}
      px={2}
    >
      {/* Dientes en forma de arco */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: 300, sm: 450, md: 650 },
          height: { xs: 400, sm: 450 },
          backgroundColor: '#f8f8f8',
          borderRadius: 2,
          border: '1px solid #ccc',
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">Dientes</Typography>
        {toothSvgPositions.map(({ number, x, y }) => (
          <Box
            key={number}
            sx={{ position: 'absolute', top: y, left: x }}
            onClick={() => setSelectedTooth(number)}
          >
            <Tooth
              number={number}
              selected={selectedTooth === number}
              onClick={() => setSelectedTooth(number)}
            />
          </Box>
        ))}
      </Box>

      {/* Imagen del cráneo */}
      <Box width={{ xs: '100%', md: 300 }}>
        <Typography variant="h6" gutterBottom textAlign="center">Cráneo</Typography>
        <Box position="relative" width="100%">
          <img
            src="/assets/craneo.png"
            alt="Cráneo frontal"
            style={{ width: '100%', height: 'auto' }}
          />
          {skullToothPositions.map(({ number, top, left }) => (
            <ToothOverlay
              key={number}
              top={top}
              left={left}
              active={selectedTooth === number}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Odontogram;
