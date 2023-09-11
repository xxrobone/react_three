/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useRef } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function Office(props) {
  const { nodes, materials } = useGLTF('./models/Office.glb');

  const ref = useRef();
  const tl = useRef();
  const libraryRef = useRef();
  const atticRef = useRef();

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // vertical movment
    tl.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

      // the hole office rotation
      
      tl.current.to(
        ref.current.rotation,
        { duration: 1, x: 0, y: Math.PI / 6, z: 0 },
        0
      );
      tl.current.to(
        ref.current.rotation,
        { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
        1
      );

    // the hole office movement

    // library
    tl.current.from(
      libraryRef.current.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5
    );
    tl.current.from(
      libraryRef.current.rotation,
      {
        duration: 0.5,
        // math.pi for rotation
        y: -Math.PI / 2,
      },
      0
    );
    // attic

    tl.current.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 2,
      },
      0
    );
    tl.current.from(atticRef.current.rotation, {
      duration: 0.5,
      // math.pi for rotation
      y: -Math.PI / 2,
    });
    tl.current.from(
      atticRef.current.position,
      {
        duration: 0.5,
        z: -2,
      },
      1.5
    );
  }, []);
  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0.5, -1, -1]}
      rotation={[0, -Math.PI / 10, 0]}
    >
      <mesh geometry={nodes['01_office'].geometry} material={materials['01']} />
      <group position={[0, 2.11, -2.23]}>
        <group ref={libraryRef}>
          <mesh
            geometry={nodes['02_library'].geometry}
            material={materials['02']}
          />
        </group>
      </group>
      <group position={[-1.97, 4.32, -2.2]}>
        <group ref={atticRef}>
          <mesh
            geometry={nodes['03_attic'].geometry}
            material={materials['03']}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/Office.glb');
