import { StyledTextField } from '../../../styles/StyledTransactionForm';

const FormRequiredInput = ({
	name,
	type,
	state,
	setState,
	emptyFields,
	errorMsg,
	msg,
}) => {
	return (
		<StyledTextField
			error={emptyFields.includes(name) ? true : false}
			value={state}
			onChange={(e) => setState(e.target.value)}
			id='outlined-number'
			label={emptyFields.includes(name) ? errorMsg : msg}
			type={type}
		/>
	);
};

export default FormRequiredInput;
