import React, { useEffect, useRef } from "react";
import { useBox, useCompoundBody, useSphere, useTrimesh } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import usePlayerControls from "./usePlayerControls";
import { Box, OrbitControls, PerspectiveCamera, PointerLockControls, RoundedBox } from "@react-three/drei";

const SPEED = 5;

export const Player = (props: any) => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    velocity: 2,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  const velocity = useRef<any>([0, 10, 0]);
  const currentPosition = useRef<any>([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.position.subscribe((v) => (currentPosition.current = v));
  }, [api.velocity, api.position]);

  useFrame(() => {
    if (!ref.current || !ref?.current?.position?.length) {
      return;
    }

    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    // direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);


    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      console.log("aaaaa")
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    }

    //new working code
    // const currentXPosition = ref?.current?.position.x;
    // const currentYPosition = ref?.current?.position.y;
    // const currentZPosition = ref?.current?.position.z;

    // console.log(currentZPosition)

    // const moveOnXAxis = (Number(moveRight) - Number(moveLeft))+currentXPosition;
    // const moveOnYAxis = jump ?  10 : 5;
    // const moveOnZAxis = (Number(moveBackward) - Number(moveForward))+currentZPosition;

    // api.position.set(moveOnXAxis, moveOnYAxis, moveOnZAxis);
  });


  return (
    <mesh ref={ref}>
      <PerspectiveCamera makeDefault position={[0, 25, 45]} rotation={[-0.25, 0, 0]} />
      <RoundedBox args={[5, 10, 5]} radius={0.5} smoothness={4}>
        <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
      </RoundedBox>
    </mesh>
  );
};

export default Player;
