import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Button from '@mui/material/Button';
import styles from './canvas.module.css';

const RenderCanvas = ({ handleRenderClose, shape, name }) => {
  const canvasContainer = useRef(null);
  const [object, setObject] = useState(null);
  const transformControlsRef = useRef(null);
  const [isShapeClicked, setIsShapeClicked] = useState(false);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const container = canvasContainer.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    let initialGeometry;
    switch (shape) {
      case 'Cube':
        initialGeometry = new THREE.BoxGeometry();
        break;
      case 'Sphere':
        initialGeometry = new THREE.SphereGeometry();
        break;
      case 'Cone':
        initialGeometry = new THREE.ConeGeometry();
        break;
      case 'Cylinder':
        initialGeometry = new THREE.CylinderGeometry();
        break;
      default:
        initialGeometry = new THREE.BoxGeometry();
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      roughness: 0.5,
      metalness: 0.5
    });
    const initialObject = new THREE.Mesh(initialGeometry, material);
    scene.add(initialObject);
    setObject(initialObject);

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

      const bbox = new THREE.Box3().setFromObject(initialObject);

      if (bbox.containsPoint(pos)) {
        transformControls.attach(initialObject);
        setIsShapeClicked(true); // Show the shape name when clicked
      } else {
        transformControls.detach();
        setIsShapeClicked(false); // Hide the shape name when clicking outside
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
      if (canvasContainer.current) {
        canvasContainer.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      transformControls.dispose();
    };
  }, [shape, name]);

  return (
    <div className="threejs-container" id="threejs-canvas" ref={canvasContainer}>
      <div className={styles.xbutton}><Button onClick={handleRenderClose} style={{color: 'white'}}>X</Button></div>
      {isShapeClicked && <div className={styles.shapename}>{name}</div>} {/* Conditionally render shape name */}
      <p className={styles.overlayText}>Press 'W' to toggle transform controls | Press 'R' to toggle scale to change dimension</p>
    </div>
  );
};

export default RenderCanvas;
