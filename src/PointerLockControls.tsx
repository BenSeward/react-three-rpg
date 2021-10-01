import React, { useEffect } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";
import { useRef } from "react";
import { extend, ReactThreeFiber, useThree } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
        pointerLockControlsImpl: ReactThreeFiber.Object3DNode<PointerLockControlsImpl, typeof PointerLockControlsImpl>;
    }
  }
}

extend({ PointerLockControlsImpl });

export const PointerLockControls = (props: any) => {
  const { camera, gl } = useThree();
  const controls: any = useRef();

  useEffect(() => {
    document.addEventListener("click", () => {
      if (!controls?.current) {
        return;
      }
      
      controls.current.lock();
    });
  }, []);

  return <pointerLockControlsImpl ref={controls} args={[camera, gl.domElement]} {...props} />;
};
