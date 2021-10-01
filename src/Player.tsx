import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import usePlayerControls from "./usePlayerControls";
import { Box, OrbitControls, PerspectiveCamera, PointerLockControls, RoundedBox } from "@react-three/drei";

const SPEED = 5;

export const Player = (props: any) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  const velocity = useRef<any>([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    camera.position.copy(ref.current.position);
    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <PointerLockControls />
      <RoundedBox args={[10, 10, 10]} radius={0.5} smoothness={4}>
        <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
      </RoundedBox>
    </group>
  );
};

export default Player;
