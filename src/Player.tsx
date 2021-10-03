import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import usePlayerControls from "./usePlayerControls";
import { OrbitControls, PerspectiveCamera, TrackballControls, TransformControls } from "@react-three/drei";
import Axe from "./Axe";

const SPEED = 5;

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef<any>();

  useFrame((state) => {
    if (!controls.current) {
      return;
    }
    console.log(controls.current);

    controls.current.update();
  });

  return <OrbitControls ref={controls} args={[camera, domElement]} />;
};

export const Player = (props: any) => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Kinematic",
    ...props,
  }));

  const velocity = useRef<any>([0, 0, 0]);
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

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 0, velocity.current[2]);
    }

    ref.current.add(camera);

    if(!currentPosition?.current) {
      return;
    }

    const currentArr = currentPosition.current;

    camera.lookAt(currentArr[0], currentArr[1], currentArr[2]);
  });

  return (
    <>
      <group ref={ref}>
        <PerspectiveCamera position={[0, 5,5]} makeDefault />
        <OrbitControls />
        <Axe />
      </group>
    </>
  );
};

export default Player;
