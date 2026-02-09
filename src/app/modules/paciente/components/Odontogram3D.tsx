// components/Odontogram3D.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import Tooth3D from './Tooth3D';

const Odontogram3D = () => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  const teethNumbers = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OrbitControls />

        {teethNumbers.map((num, idx) => (
          <Tooth3D
            key={num}
            position={[(idx - 8) * 2, 0, 0]}
            number={num}
            selected={selectedTooth === num}
            onClick={() => setSelectedTooth(num)}
          />
        ))}

        {selectedTooth && (
          <Html center>
            <div style={{
              background: '#ffffffdd',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontWeight: 'bold',
              border: '1px solid #ccc'
            }}>
              Diente seleccionado: {selectedTooth}
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default Odontogram3D;
