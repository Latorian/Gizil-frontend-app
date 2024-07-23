import {useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import './App.css';
import ObjectTable from './components/Table/Table.js';
import CreateButton from './components/Button/CreateButton.js';
import RenderButton from './components/Button/RenderButton.js';
import CreateModal from './components/Modal/CreateModal.js';
import RenderCanvas from './components/Modal/RenderModal.js';
import RenderAllCanvas from './components/Modal/RenderAllCanvas.js';
import styles from './components/Button/Button.module.css'



function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentShape, setCurrentShape] = useState(null);
  const [selectedShapeName, setSelectedShapeName] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);
   const [showAllCanvas, setShowAllCanvas] = useState(false)
  const handleRender = (shape, name) => {
    setCurrentShape(shape);
    setSelectedShapeName(name);
    setShowCanvas(true); 
  }

  const handleRenderClose = () => {
    setShowCanvas(false);
    setCurrentShape(null);
  };

  const handleRenderAll = () => {
    setShowAllCanvas(true);
  };

  const handleRenderAllClose = () => {
    setShowAllCanvas(false);
  };

  const [entries, setEntries] = useState([]);
   const addEntry = (newEntry) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, newEntry];
      localStorage.setItem('entries', JSON.stringify(updatedEntries)); // Save to localStorage
      return updatedEntries;
    });
  };

  const deleteEntry = (index) => {
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.filter((entry, i) => i !== index);
      localStorage.setItem('entries', JSON.stringify(updatedEntries)); // Save to localStorage
      return updatedEntries;
    });
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);


  return (
    <>
      {!showCanvas && !showAllCanvas && (
        <div className="app-container">
          <div className={styles.buttonGroup}>
            <Tooltip title="Render all shapes">
              <Button variant="outlined" onClick={handleRenderAll}>Render</Button>
            </Tooltip>
            <CreateButton handleOpen={handleOpen} />
          </div>
          <CreateModal open={open} handleClose={handleClose} handleCreate={addEntry} />
          <ObjectTable entries={entries} handleRender={handleRender} handleDelete={deleteEntry} />
        </div>
      )}
      {showCanvas && (
        <RenderCanvas shape={currentShape} name={selectedShapeName} handleRenderClose={handleRenderClose} />
      )}
      {showAllCanvas && (
        <RenderAllCanvas entries={entries} handleRenderClose={handleRenderAllClose} />
      )}
    </>
  );
}

export default App;
