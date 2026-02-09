// components/Tooth3D.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ToothProps {
  position: [number, number, number];
  number: number;
  selected: boolean;
  onClick: () => void;
}

const Tooth3D = ({ position, number, selected, onClick }: ToothProps) => {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={onClick}
      scale={selected ? 1.2 : 1}
    >
      <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
      <meshStandardMaterial color={selected ? 'orange' : '#cccccc'} />
    </mesh>
  );
};

export default Tooth3D;
