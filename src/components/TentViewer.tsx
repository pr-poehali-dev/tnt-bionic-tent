import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Center,
  Bounds,
} from "@react-three/drei";
import { Suspense } from "react";

const MODEL_URL =
  "https://cdn.poehali.dev/projects/a8250dc6-3643-4a52-8f7c-e2cafb69c475/bucket/models/tent.glb";

useGLTF.preload(MODEL_URL);

function TentModel() {
  const { scene } = useGLTF(MODEL_URL);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#999" wireframe />
    </mesh>
  );
}

export default function TentViewer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [4, 2.5, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <TentModel />
          </Bounds>
        </Suspense>

        <ContactShadows
          position={[0, -0.7, 0]}
          opacity={0.35}
          scale={10}
          blur={2.5}
          far={4}
        />
        <Environment preset="sunset" />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={15}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.05}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-neutral-400 uppercase">
        Перетащите для вращения
      </div>
    </div>
  );
}