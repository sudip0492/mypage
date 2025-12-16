"use client";

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';

function Starfield() {
    const ref = useRef<THREE.Points | null>(null);
    const count = 2000;
    const [positions] = useState(() => inSphere(new Float32Array(count * 3), { radius: 5 }) as Float32Array);
    const { gl, camera, size } = useThree();

    // Handle visibility changes and ensure proper canvas state
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && gl && camera) {
                // Force a resize when tab becomes visible
                gl.setSize(size.width, size.height);
                // Only update aspect if it's a PerspectiveCamera
                if ('aspect' in camera) {
                    camera.aspect = size.width / size.height;
                }
                camera.updateProjectionMatrix();
                gl.setPixelRatio(window.devicePixelRatio);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleVisibilityChange);
        };
    }, [gl, camera, size]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Cap delta to prevent large jumps when tab becomes visible again
            const cappedDelta = Math.min(delta, 0.1);
            const positions = ref.current.geometry.attributes.position.array;
            const speed = 0.5;

            for (let i = 0; i < count * 3; i += 3) {
                // Move stars towards the camera
                positions[i + 2] += cappedDelta * speed;

                // Reset when they go past the camera
                if (positions[i + 2] > 5) {
                    positions[i] = (Math.random() - 0.5) * 10;
                    positions[i + 1] = (Math.random() - 0.5) * 10;
                    positions[i + 2] = -5;
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;

            // Warp visual effect: stretch stars
            ref.current.scale.z = 1;
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
            <Canvas
                camera={{ position: [0, 0, 5] }}
                frameloop="always"
                dpr={[1, 2]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Starfield />
            </Canvas>
        </div>
    );
}