import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './modal.module.css';
import Input from '../Inputs/Input.js';
import Dropdown from '../Inputs/Dropdown.js';


const ModalComponent = ({ open, handleClose, handleCreate }) => {

  const [name, setName] = useState('');
  const [shape, setShape] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleShapeChange = (event) => setShape(event.target.value);

  const onSubmit = () => {
   
      handleCreate({ name, shape });
      setName('');
      setShape('');
      handleClose();
    
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.create}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.title}>
              Create Modal
          </Typography>
          <div class={styles.inputs}>
            <Input value={name} handleNameChange={handleNameChange} />
            <Dropdown  value={shape} handleShapeChange={handleShapeChange} />
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="contained" onClick={onSubmit}>Create</Button>     
            <Button variant="outlined" onClick={handleClose}>Cancel</Button> 
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComponent;