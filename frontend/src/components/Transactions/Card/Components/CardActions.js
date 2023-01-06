import React from 'react';
import {
	StyledButtonContainer,
	StyledActionDiv,
} from '../../../../styles/StyledCard';
import { RiDeleteBin6Fill, RiEditLine } from 'react-icons/ri';
import { ImFilePicture } from 'react-icons/im';
import useDebounce from '../../../../hooks/useDebounce';
import uuid from 'react-uuid';

const CardActions = ({
	setShowDelete,
	setShowImage,
	setShowUpdate,
	showUpdate,
}) => {
	const openDeleteModal = useDebounce(() => setShowDelete(true));
	const openImageModal = useDebounce(() => setShowImage(true));
	const toggleUpdate = useDebounce(() => setShowUpdate(!showUpdate));

	const actionsObject = [
		{
			name: 'Edit',
			icon: () => <RiEditLine size={20} color='white' />,
			func: toggleUpdate,
		},
		{
			name: 'Image',
			icon: () => <ImFilePicture size={20} color='white' />,
			func: openImageModal,
		},
		{
			name: 'Delete',
			icon: () => <RiDeleteBin6Fill size={20} color='white' />,
			func: openDeleteModal,
		},
	];

	return (
		<StyledButtonContainer>
			{actionsObject.map((action, i) => {
				return (
					<StyledActionDiv
						key={uuid()}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							width: { duration: 1, type: 'spring' },
							opacity: { duration: 1, type: 'spring' },
							borderRadius: { duration: 2, type: 'spring' },
						}}
						layout
						onClick={(e) => {
							e.stopPropagation();
							action.func();
						}}
					>
						<div className='garbage-container'>{action.icon()}</div>
					</StyledActionDiv>
				);
			})}
		</StyledButtonContainer>
	);
};

export default CardActions;
