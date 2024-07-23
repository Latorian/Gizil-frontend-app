import TextField from '@mui/material/TextField';

import styles from './Input.module.css';


const input = ({ name, handleNameChange}) => {
    return (

        <div className={styles.input}>
            <p className={styles.label}>Name</p> 
            <TextField
                value={name}
                onChange={handleNameChange}
                id="outlined-helperText" 
                size="small" 
                sx={{
                    width: 200,
                    maxWidth: '100%',
                }}
            />
        </div>
    );
}

export default input;