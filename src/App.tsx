import { Canvas } from "@react-three/fiber";
import { Sky, Stars } from "@react-three/drei";
import "./App.css";
import Ground from "./Ground";
import { Physics } from "@react-three/cannon";
import { Vector3 } from "three";
import Player from "./Player";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas style={{ backgroundColor: "#000000" }}>
        {/* <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
        <Sky distance={6000} turbidity={8} rayleigh={4} mieCoefficient={0.02} mieDirectionalG={0.6} inclination={0.5} azimuth={0.25} />

        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[1000, 1000, 1000]} />

        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
