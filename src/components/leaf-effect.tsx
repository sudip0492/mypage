"use client";

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';

function FallingLeaves() {
    const ref = useRef<THREE.Points | null>(null);
    const count = 1000;
    const [positions] = useState(() => inSphere(new Float32Array(count * 3), { radius: 5 }) as Float32Array);

    useFrame((state, delta) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < count * 3; i += 3) {
                // Fall down
                positions[i + 1] -= delta * 0.2;

                // Sway
                positions[i] += Math.sin(state.clock.elapsedTime + i) * delta * 0.1;

                // Reset when they go off screen
                if (positions[i + 1] < -5) {
                    positions[i] = (Math.random() - 0.5) * 10;
                    positions[i + 1] = 5;
                    positions[i + 2] = (Math.random() - 0.5) * 10;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#4caf50"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.7}
            />
        </Points>
    );
}

export function LeafEffectCanvas() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.1} />
                <pointLight intensity={0.2} position={[0, 5, 5]} />
                <FallingLeaves />
            </Canvas>
        </div>
    );
}
