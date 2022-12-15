import React from 'react';
import { StyledUpper } from '../../../../styles/StyledCard';
import CardTitle from '.././Components/CardTitle';
import CardActions from '.././Components/CardActions';

const MainInfo = ({
	transaction,
	setShowDelete,
	setShowImage,
	showUpdate,
	setShowUpdate,
	isOpen,
}) => {
	return (
		<StyledUpper>
			<CardTitle
				isOpen={isOpen}
				showUpdate={showUpdate}
				transaction={transaction}
			/>
			{isOpen && (
				<CardActions
					setShowDelete={setShowDelete}
					setShowImage={setShowImage}
					setShowUpdate={setShowUpdate}
					showUpdate={showUpdate}
				/>
			)}
		</StyledUpper>
	);
};

export default MainInfo;
