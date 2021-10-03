import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

const Camera = (props: any) => {
  const ref = useRef<any>();
  const set = useThree((state) => state.set);

  // Make the camera known to the system
  useEffect(() => void set({ camera: ref.current }), []);
  // Update it every frame
  useFrame(() => {
    if (!ref?.current) {
      return;
    }

    ref.current.updateMatrixWorld();
  });
  return (
    <>
      <OrthographicCamera position={[0, 5, 5]} />
      <perspectiveCamera ref={ref} {...props} />
    </>
  );
};

export default Camera;
