import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import RenderButton from '../Button/RenderButton.js';
import RenderCanvas from '../Modal/RenderModal.js';
import PropTypes from 'prop-types';
import styles from '../Button/Button.module.css'
import tablestyle from './Table.module.css'



const ObjectTable = ({ entries = [], handleRender, handleDelete  }) => {
	return (
		<TableContainer className={tablestyle.tableContainer} component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Shape Type</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{entries.map((entry, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{entry.name}</TableCell>
							<TableCell>{entry.shape}</TableCell>
							<TableCell>
								<div className={styles.tablebuttonGroup}>
									<RenderButton shape={entry.shape} name={entry.name} handleRender={handleRender} />
									<Button variant="outlined"  onClick={() => handleDelete(index)} >Delete</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

ObjectTable.propTypes = {
  entries: PropTypes.array.isRequired,
  handleRender: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ObjectTable;