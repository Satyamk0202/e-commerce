import React,{Suspense} from 'react'
import {Canvas,useFrame} from '@react-three/fiber'
import {Float,MeshDistortMaterial,Environment,ContactShadows} from '@react-three/drei'
import * as THREE from 'three'
function Orb(){const ref=React.useRef();useFrame((state,delta)=>{if(ref.current){ref.current.rotation.y+=delta*.18;ref.current.rotation.x=Math.sin(state.clock.elapsedTime*.25)*.12}});return <Float speed={1.25} rotationIntensity={.35} floatIntensity={.55}><mesh ref={ref} scale={1.55}><icosahedronGeometry args={[1,5]}/><MeshDistortMaterial color="#d7ff64" roughness={.19} metalness={.55} distort={.34} speed={1.7}/></mesh></Float>}
export default function OrbScene(){return <div className="orb-scene" aria-label="Animated 3D lime sculptural object"><Canvas camera={{position:[0,0,4.8],fov:38}} dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><ambientLight intensity={1.5}/><directionalLight position={[4,5,5]} intensity={3}/><pointLight position={[-3,-2,2]} color="#d7ff64" intensity={3}/><Suspense fallback={null}><Orb/><Environment preset="studio"/></Suspense><ContactShadows position={[0,-1.7,0]} opacity={.28} scale={5} blur={2.5}/></Canvas></div>}
