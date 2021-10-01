import React, { useEffect, useRef } from "react";
import { useSphere, useTrimesh } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import usePlayerControls from "./usePlayerControls";
import { Box, OrbitControls, PerspectiveCamera, PointerLockControls, RoundedBox } from "@react-three/drei";

const SPEED = 5;

export const Player = (props: any) => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
  const [ref, api] = useTrimesh(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  //   const velocity = useRef<any>([0, 0, 0]);
  //   useEffect(() => {
  //     api.velocity.subscribe((v) => (velocity.current = v));
  //   }, [api.velocity]);

  useFrame(() => {
    if (!ref.current || !ref?.current?.position?.length) {
      return;
    }

    //   const direction = new Vector3();
    //   const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
    //   const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    //   direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
    //   api.velocity.set(direction.x, velocity.current[1], direction.z);
    //   if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
    //     api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    //   }

    const currentXPosition = ref?.current?.position.x;
    const currentYPosition = ref?.current?.position.x;
    const currentZPosition = ref?.current?.position.z;

    console.log(currentXPosition);

    const moveOnXAxis = (Number(moveRight) - Number(moveLeft))+currentXPosition;
    const moveOnZAxis = (Number(moveBackward) - Number(moveForward))+currentZPosition;

    ref.current.position.set(moveOnXAxis, 5, moveOnZAxis);
  });

  return (
    <group ref={ref}>
      <PerspectiveCamera makeDefault position={[0, 25, 45]} rotation={[-0.55, 0, 0]} />
      <RoundedBox args={[5, 10, 5]} radius={0.5} smoothness={4}>
        <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
      </RoundedBox>
    </group>
  );
};

export default Player;
