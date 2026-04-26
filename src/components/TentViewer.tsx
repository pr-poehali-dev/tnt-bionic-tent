import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function TentMesh() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  const portholes = [];
  const ringCount = 8;
  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2;
    portholes.push({ angle, y: 0.6 });
  }
  const ring2 = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + 0.3;
    ring2.push({ angle, y: 1.4 });
  }

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Платформа */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.5, 0.2, 64]} />
        <meshStandardMaterial color="#e8dfc9" roughness={0.9} />
      </mesh>

      {/* Купол */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#c0392b"
          roughness={0.55}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Пояс/основание купола */}
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[2.0, 0.04, 16, 64]} />
        <meshStandardMaterial color="#8b2818" roughness={0.5} />
      </mesh>

      {/* Иллюминаторы нижнего ряда */}
      {portholes.map((p, idx) => {
        const x = Math.sin(p.angle) * 1.95;
        const z = Math.cos(p.angle) * 1.95;
        return (
          <group key={idx} position={[x, p.y, z]} rotation={[0, p.angle, 0]}>
            <mesh>
              <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.27, 0.27, 0.05, 32]} />
              <meshPhysicalMaterial
                color="#5fc7d4"
                roughness={0.05}
                metalness={0.2}
                transmission={0.6}
                thickness={0.5}
              />
            </mesh>
          </group>
        );
      })}

      {/* Иллюминаторы верхнего ряда */}
      {ring2.map((p, idx) => {
        const r = 1.7;
        const x = Math.sin(p.angle) * r;
        const z = Math.cos(p.angle) * r;
        const y = p.y;
        return (
          <group
            key={"r2-" + idx}
            position={[x, y, z]}
            rotation={[0, p.angle, -0.3]}
          >
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
              <meshPhysicalMaterial
                color="#5fc7d4"
                roughness={0.05}
                metalness={0.2}
                transmission={0.6}
                thickness={0.5}
              />
            </mesh>
          </group>
        );
      })}

      {/* Верхушка */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#8b2818" roughness={0.4} />
      </mesh>

      {/* Дверь */}
      <mesh position={[0, 0.4, 1.99]}>
        <boxGeometry args={[0.7, 1.0, 0.05]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.7} />
      </mesh>
    </group>
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
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <TentMesh />
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
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
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
