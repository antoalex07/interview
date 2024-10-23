import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Picker2 } from '../../components/models/Chair3';
import Chair3 from '../../components/models/Chair3';

const Scene3 = () => {

    const CustomCamera = () => {
    
        const cameraRef = useRef();
    
        useFrame(() => {
            if(cameraRef.current) {
            console.log('Camera position:', cameraRef.current.position);
            console.log('Camera rotation:', cameraRef.current.rotation);
            }
        });
    
      return (
        <PerspectiveCamera ref={cameraRef} makeDefault position={[23.17, 42, 39.53]} fov={75} />
      )
    }
    
  return (
    <div>
        <Picker2/>
        <Canvas>
            <CustomCamera/>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls enableZoom={true} />
            <Chair3/>
        </Canvas>
    </div>
  )
}

export default Scene3