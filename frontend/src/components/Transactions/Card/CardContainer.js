import { useState } from 'react';
import Card from './Components/Card';
import DeleteModal from './Modals/DeleteModal';
import ImageModal from './Modals/ImageModal';

const PurchaseCard = ({ transaction }) => {
	const [showImage, setShowImage] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	return (
		<>
			<Card
				transaction={transaction}
				setShowDelete={setShowDelete}
				setShowImage={setShowImage}
			/>
			<ImageModal
				showImage={showImage}
				setShowImage={setShowImage}
				imageData={transaction.imageData.url}
			/>
			<DeleteModal
				showDelete={showDelete}
				setShowDelete={setShowDelete}
				transaction={transaction}
			/>
		</>
	);
};

export default PurchaseCard;
