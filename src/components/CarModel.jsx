import React, { useMemo, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Box3, Vector3, Color } from 'three';

const CarModel = ({ car, selectedColor, selectedWheel, selectedInteriorColor, openDoor }) => {
  const modelPath = car.model || '/models/ferrari_with_door_animations.glb';
  const { scene: originalScene, animations } = useGLTF(modelPath);
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  const processedScene = useMemo(() => {
    const cloned = originalScene.clone(true);

    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    box.getSize(size);
    const scale = 3 / Math.max(size.x, size.y, size.z);
    const center = new Vector3();
    box.getCenter(center);
    cloned.position.sub(center);
    cloned.scale.setScalar(scale);

    const carColor = new Color(selectedColor);
    const interiorColor = new Color(selectedInteriorColor);
    const wheelColor = new Color(
      selectedWheel === 'sport' ? '#444' :
      selectedWheel === 'chrome' ? '#ccc' :
      selectedWheel === 'black' ? '#111' :
      selectedWheel === 'gold' ? '#FFD700' :
      selectedWheel === 'carbon' ? '#2e2e2e' :
      '#888'
    );

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const name = child.name.toLowerCase();
        const isWheel = name.includes('wheel');
        const isInterior = name.includes('interior') || name.includes('seat') || name.includes('dashboard');
        const targetColor = isWheel ? wheelColor : isInterior ? interiorColor : carColor;

        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.color?.set(targetColor));
        } else {
          child.material.color?.set(targetColor);
        }
        child.material.needsUpdate = true;
      }
    });

    return cloned;
  }, [originalScene, selectedColor, selectedWheel, selectedInteriorColor]);

  useEffect(() => {
    if (openDoor && actions?.LeftDoorAction) {
      actions.LeftDoorAction.reset().fadeIn(0.5).play();
    } else {
      actions.LeftDoorAction?.fadeOut(0.5).stop();
    }
  }, [openDoor, actions]);

  return (
    <group ref={group}>
      <primitive object={processedScene} />
    </group>
  );
};

export default CarModel;
