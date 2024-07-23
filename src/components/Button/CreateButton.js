import Button from '@mui/material/Button';

const CreateButton = ({ handleOpen }) => {
  return (
    <Button variant="contained" onClick={handleOpen}>Create</Button>
  );
};

export default CreateButton;