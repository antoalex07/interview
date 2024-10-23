import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Chair, { Picker } from '../../components/models/Chair'
import './Scene1.css';

const Scene1 = () => {
  return (
    <div>
        <Picker/>
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls enableZoom={true} />
            <Chair/>
        </Canvas>
    </div>
  )
}

export default Scene1