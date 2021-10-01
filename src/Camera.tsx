import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useThree } from "@react-three/fiber";

const Camera = (props: any) => {
  const ref = useRef<any>();
  const { set, size } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.aspect = size.width / size.height;
      ref.current.updateProjectionMatrix()
    }
  }, [size, props]);

  useEffect(() => {
    set({ camera: ref.current });
    // eslint-disable-next-line
  }, []);

  return <perspectiveCamera ref={ref} {...props} />;
};

export default Camera;