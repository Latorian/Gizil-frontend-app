import { useState } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import Cube from '../Shapes/Cube';
import Sphere from '../Shapes/Sphere';
import Cone from '../Shapes/Cone';
import Cylinder from '../Shapes/Cylinder';
import Button from '@mui/material/Button';


const RenderButton = ({ shape, name, handleRender }) => {

  return (
    <div>
      <Button variant="contained"  onClick={() => handleRender(shape, name)}>Render</Button>
    </div>
  );
};

export default RenderButton;