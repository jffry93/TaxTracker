import TextField from '@mui/material/TextField';

const FormInput = ({ state, setState }) => {
	return (
		<TextField
			type='text'
			onChange={(e) => setState(e.target.value)}
			value={state}
			id='outlined-basic'
			label='Client'
			variant='outlined'
		/>
	);
};

export default FormInput;
