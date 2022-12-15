import React from 'react';
import UpdateTransaction from '../UpdateForm/UpdateTransaction';
import {
	StyledLower,
	StyledContent,
	StyledMoreAction,
} from '../../../../styles/StyledCard';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MoreInfo = ({
	isOpen,
	showUpdate,
	transaction,
	setShowUpdate,
	setIsOpen,
}) => {
	return (
		<>
			{isOpen ? (
				<StyledContent
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ opacity: { duration: 1.5, type: 'spring' } }}
					layout
				>
					{!showUpdate ? (
						<p>{transaction.description}</p>
					) : (
						<UpdateTransaction
							transaction={transaction}
							setShowUpdate={setShowUpdate}
							setIsOpen={setIsOpen}
						/>
					)}
					<StyledLower>
						<p className='time-stamp'>
							{formatDistanceToNow(new Date(transaction.createdAt), {
								addSuffix: true,
							})}
						</p>
					</StyledLower>
				</StyledContent>
			) : (
				<StyledMoreAction
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='more'
				>
					More Details
				</StyledMoreAction>
			)}
		</>
	);
};

export default MoreInfo;
