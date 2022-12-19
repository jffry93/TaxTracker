import React from 'react';
import handleImgToBase64 from '../../../utils/handleImgToBase64';
import {
	StyledForm,
	StyledImgDiv,
	StyledTextField,
} from '../../../styles/StyledTransactionForm';
import FormInput from './FormInput';
import FormRequiredInput from './FormRequiredInput';
import ButtonContainer from './ButtonContainer';

const TransactionForm = ({
	handleDebounce,
	handleClose,
	emptyFields,
	client,
	setClient,
	amount,
	setAmount,
	setTitle,
	title,
	description,
	setDescription,
	setImage,
	imageValue,
	setImageValue,
}) => {
	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();
				handleDebounce();
			}}
		>
			<div className='form-container'>
				<div className='top-section'>
					<div className='info-container first-item'>
						<FormInput state={client} setState={setClient} />
					</div>
					<div className='info-container second-item'>
						<FormRequiredInput
							type='number'
							name='amount'
							state={amount}
							setState={setAmount}
							emptyFields={emptyFields}
							errorMsg='How much?'
							msg='Amount'
						/>
					</div>
				</div>
				<FormRequiredInput
					type='text'
					name='title'
					state={title}
					setState={setTitle}
					emptyFields={emptyFields}
					errorMsg="What'd you buy?"
					msg='Purchase Title'
				/>
				<FormRequiredInput
					type='text'
					name='description'
					state={description}
					setState={setDescription}
					emptyFields={emptyFields}
					errorMsg='Purpose for purchase?'
					msg='Description'
				/>
				<StyledImgDiv errorStatus={emptyFields.includes('image')}>
					<StyledTextField
						error={emptyFields.includes('image') ? true : false}
						label={emptyFields.includes('image') ? 'Add an Image' : 'Document'}
						value={imageValue}
						type='file'
						accept='image/*'
						onChange={(e) => {
							setImage(handleImgToBase64(e.target.files[0], setImage));
							setImageValue(e.target.value);
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</StyledImgDiv>
				<ButtonContainer handleClose={handleClose} />
			</div>
		</StyledForm>
	);
};

export default TransactionForm;
