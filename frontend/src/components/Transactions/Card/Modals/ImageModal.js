import React from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { StyledModal, StyledImageBox } from '../../../../styles/StyledModal';

const ImageModal = ({ showImage, setShowImage, imageData }) => {
	const closeImageModal = useDebounce(() => setShowImage(false));

	return (
		<StyledModal
			open={showImage}
			onClose={(e) => {
				e.stopPropagation();
				closeImageModal();
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<StyledImageBox>
				<img
					src={imageData}
					alt=''
					onClick={(e) => {
						e.stopPropagation();
						closeImageModal();
					}}
				/>
			</StyledImageBox>
		</StyledModal>
	);
};

export default ImageModal;
