"use client";

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';

function Starfield() {
    const ref = useRef<THREE.Points | null>(null);
    const count = 5000;
    const [positions] = useState(() => inSphere(new Float32Array(count * 3), { radius: 5 }) as Float32Array);

    useFrame((state, delta) => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < count * 3; i += 3) {
                // Move stars towards the camera
                positions[i + 2] += delta * 0.5;

                // Reset when they go past the camera
                if (positions[i + 2] > 5) {
                    positions[i] = (Math.random() - 0.5) * 10;
                    positions[i + 1] = (Math.random() - 0.5) * 10;
                    positions[i + 2] = -5;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
            />
        </Points>
    );
}

export function StarfieldCanvas() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Starfield />
            </Canvas>
        </div>
    );
}