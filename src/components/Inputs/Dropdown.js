import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './Input.module.css';

const Dropdown = ({ shape, handleShapeChange }) => {
    return (
        <div className={styles.input}>
            <p class={styles.label}>Shape Type</p>
            <FormControl size="small">
            <Select
               value={shape}
               onChange={handleShapeChange}
               displayEmpty
               fullWidth
               className={styles.dropdown}
               sx={{
                    width: 200,
                    maxWidth: '100%',
                }}
            >
              <MenuItem value="Cube">Cube</MenuItem>
              <MenuItem value="Sphere">Sphere</MenuItem>
              <MenuItem value="Cone">Cone</MenuItem>
              <MenuItem value="Cylinder">Cylinder</MenuItem>
            </Select>
          </FormControl>
        </div>
    );
}

export default Dropdown;