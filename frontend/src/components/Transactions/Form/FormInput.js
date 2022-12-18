import { StyledTextField } from '../../../styles/StyledTransactionForm';

const FormInput = ({ state, setState }) => {
	const styles = (theme) => ({
		notchedOutline: {
			borderWidth: '1px',
			// borderColor: 'yellow !important',
		},
	});
	return (
		<StyledTextField
			type='text'
			onChange={(e) => setState(e.target.value)}
			value={state}
			id='outlined-basic'
			label='Client'
			variant='outlined'
			InputProps={{
				classes: {
					notchedOutline: styles,
				},
			}}
		/>
	);
};

export default FormInput;
