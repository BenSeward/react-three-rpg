import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import "./App.css";
import Ground from "./Ground";
import { Physics } from "@react-three/cannon";
import { Vector3 } from "three";
import Player from "./Player";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas>
        <Sky sunPosition={new Vector3(1000, 10, 1000)} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />

        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
