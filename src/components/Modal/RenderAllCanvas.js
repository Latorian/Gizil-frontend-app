import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Button from '@mui/material/Button';
import styles from './canvas.module.css';

const RenderAllCanvas = ({ entries, handleRenderClose }) => {
  const canvasContainer = useRef(null);
  const transformControlsRef = useRef(null);
  const [clickedShapeName, setClickedShapeName] = useState('');

  useEffect(() => {
    if (!canvasContainer.current) return;

    const container = canvasContainer.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometries = {
      Cube: new THREE.BoxGeometry(),
      Sphere: new THREE.SphereGeometry(),
      Cone: new THREE.ConeGeometry(),
      Cylinder: new THREE.CylinderGeometry(),
    };

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      roughness: 0.5,
      metalness: 0.5,
    });

    const shapes = [];

    let xOffset = -entries.length; // Adjust the offset to center the shapes

    entries.forEach((entry, index) => {
      const geometry = geometries[entry.shape] || new THREE.BoxGeometry();
      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = xOffset + index * 2; // Adjust the x position to place shapes side by side
      scene.add(shape);
      shapes.push({ mesh: shape, name: entry.name });
    });

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    // Add TransformControls
    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControlsRef.current = transformControls; // Save to ref
    scene.add(transformControls);

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(event.clientY - rect.top) / rect.height * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      let shapeClicked = false;
      shapes.forEach(({ mesh, name }) => {
        const bbox = new THREE.Box3().setFromObject(mesh);
        if (bbox.containsPoint(pos)) {
          transformControls.attach(mesh);
          setClickedShapeName(name); // Show the shape name when clicked
          shapeClicked = true;
        }
      });

      if (!shapeClicked) {
        transformControls.detach();
        setClickedShapeName(''); // Hide the shape name when clicking outside
      }
    };

    renderer.domElement.addEventListener('click', onClick);

    // Add event listener for keydown to change modes
    const onKeyDown = (event) => {
      const transformControls = transformControlsRef.current;
      if (!transformControls || !transformControls.object) return;
      switch (event.key) {
        case 'w': // translate
          transformControls.setMode('translate');
          break;
        case 'r': // scale
          transformControls.setMode('scale');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      transformControls.dispose();
    };
  }, [entries]);

  return (
    <div className="threejs-container" id="all-shapes-canvas" ref={canvasContainer}>
      <div className={styles.xbutton}><Button onClick={handleRenderClose} style={{color: 'white'}}>X</Button></div>
      {clickedShapeName && <div className={styles.shapename}>{clickedShapeName}</div>} {/* Conditionally render shape name */}
      <p className={styles.overlayText}>Press 'W' to toggle transform controls | Press 'R' to toggle scale to change dimension</p>
    </div>
  );
};

export default RenderAllCanvas;
