import { usePlane } from "@react-three/cannon";
import { RepeatWrapping, TextureLoader } from "three";
import grass from "./grass.jpg";

const Ground = (props: any) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  const texture = new TextureLoader().load(grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(24, 24);

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" color="green" />
    </mesh>
  );
};

export default Ground;
