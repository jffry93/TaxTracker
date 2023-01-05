import React from 'react';

const TypeContainer = ({ type, debounceType }) => {
	return (
		<div className='button-container'>
			<h2>
				Add New <span>{type === 'payment' ? 'Invoice' : 'Receipt'}</span>
			</h2>
			<button
				onClick={debounceType}
				className={type !== 'payment' ? 'secondary-btn' : ''}
			>
				{type !== 'payment' ? 'Invoice' : 'Receipt'}
			</button>
		</div>
	);
};

export default TypeContainer;
