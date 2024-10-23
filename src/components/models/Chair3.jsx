import React, { useRef, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'
import { TextureLoader } from 'three'

// Default textures and colors
const defaultTextures = {
  Material1: './textures/fabric.jpg',
  plastic_wit: './textures/fabric.jpg',
  skp_front_default: './textures/fabric.jpg',
  onderstel: './textures/fabric.jpg'
}

const state = proxy({
  current: null,
  items: {
    Material1: null, // Initially no texture, can add default texture path
    plastic_wit: null,
    skp_front_default: null,
    onderstel: null
  }
})

export default function Model1(props) {
  const { nodes, materials } = useGLTF('./chair2/Chair2.gltf')
  const ref = useRef();
  const snap = useSnapshot(state);

  // Load textures
  const material1Texture = useTexture(snap.items.Material1 || defaultTextures.Material1);
  const plasticWitTexture = useTexture(snap.items.plastic_wit || defaultTextures.plastic_wit);
  const skpFrontTexture = useTexture(snap.items.skp_front_default || defaultTextures.skp_front_default);
  const onderstelTexture = useTexture(snap.items.onderstel || defaultTextures.onderstel);

  const [hover, setHover] = useState(null);

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHover(e.object.material.name)
  }

  const handlePointerOut = (e) => {
    e.intersections.length === 0 && setHover(null)
  }

  const handlePointerDown = (e) => {
    e.stopPropagation();
    state.current = e.object.material.name;
  }

  const handlePointerMissed = (e) => {
    state.current = null;
  }

  return (
    <group 
        ref={ref}
        {...props} 
        dispose={null}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerMissed={handlePointerMissed}>

      <group position={[-0.003, 0, -0.033]} rotation={[-1.569, 0, 0.081]}>
        <mesh material-map={material1Texture} geometry={nodes.Object_2.geometry} material={materials.Material1} />
        <mesh material-map={plasticWitTexture} geometry={nodes.Object_3.geometry} material={materials.plastic_wit} />
        <mesh material-map={skpFrontTexture} geometry={nodes.Object_4.geometry} material={materials.skp_front_default} />
        <mesh material-map={onderstelTexture} geometry={nodes.Object_5.geometry} material={materials.onderstel} />
      </group>
    </group>
  )
}

export function Picker2() {

  const snap = useSnapshot(state);
  
  const handleTextureChange = (texture) => {
    // Assign the selected texture to the current material
    state.items[snap.current] = texture;
  }

  // Reset function to restore default textures and colors
  const resetTextures = () => {
    state.items = { ...defaultTextures };  // Reset to default textures
  }

  return (
    <div style={{display: snap.current ? "block" : "none",
      alignItems: "center",
      position: "relative"
    }}>
      <div>
        <button onClick={() => handleTextureChange('./textures/leather.png')}>
          Apply Texture 1
        </button>
        <button onClick={() => handleTextureChange('./textures/wood.png')}>
          Apply Texture 2
        </button>
      </div>

      {/* Reset button */}
      <button onClick={resetTextures} style={{marginTop: '10px'}}>
        Reset to Default Textures
      </button>
    </div>
  )
}

useGLTF.preload('./chair2/Chair2.gltf')
