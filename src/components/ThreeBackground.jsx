import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let renderer, scene, camera, animationFrameId;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 35;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      const particlesCount = 900;
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);

      const colors = [
        new THREE.Color(0x9E7AFF),
        new THREE.Color(0x53B1FD),
        new THREE.Color(0x00ff88),
        new THREE.Color(0xFF4D00),
      ];

      for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 90;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 90;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 90;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorArray[i * 3] = randomColor.r;
        colorArray[i * 3 + 1] = randomColor.g;
        colorArray[i * 3 + 2] = randomColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

      const material = new THREE.PointsMaterial({
        size: 0.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(geometry, material);
      scene.add(particlesMesh);

      const group = new THREE.Group();
      scene.add(group);

      const ringGeo = new THREE.TorusGeometry(8, 0.2, 16, 100);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x9E7AFF, wireframe: true, transparent: true, opacity: 0.3 });
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.25 });

      const ring1 = new THREE.Mesh(ringGeo, ringMat1);
      ring1.position.set(-15, 10, -10);
      group.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.15, 16, 100), ringMat2);
      ring2.position.set(18, -12, -15);
      ring2.rotation.x = Math.PI / 4;
      group.add(ring2);

      let mouseX = 0;
      let mouseY = 0;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const handleMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
      };

      const handleScroll = () => {
        particlesMesh.rotation.y = window.scrollY * 0.0008;
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);

      const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      const animate = () => {
        const targetX = mouseX * 0.0008;
        const targetY = mouseY * 0.0008;

        particlesMesh.rotation.y += 0.001 + (targetX - particlesMesh.rotation.y) * 0.05;
        particlesMesh.rotation.x += 0.0005 + (targetY - particlesMesh.rotation.x) * 0.05;

        ring1.rotation.x += 0.005;
        ring1.rotation.y += 0.008;

        ring2.rotation.y -= 0.006;
        ring2.rotation.z += 0.004;

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (currentMount && renderer?.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
      };
    } catch (e) {
      console.warn("ThreeBackground WebGL Error:", e);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80 dark:opacity-95"
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
