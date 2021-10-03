import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import "./App.css";
import Ground from "./Ground";
import { Physics } from "@react-three/cannon";
import Player from "./Player";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 5, 5]}} style={{ backgroundColor: "#000000" }}>
        <Sky distance={1000} turbidity={8} rayleigh={4} mieCoefficient={0.02} mieDirectionalG={0.6} inclination={0.5} azimuth={0.25} />

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
