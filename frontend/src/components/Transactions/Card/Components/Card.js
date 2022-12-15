import MoreInfo from '.././Components/MoreInfo';
import { StyledCard } from '../../../../styles/StyledCard';
import { AnimatePresence } from 'framer-motion';
import useDebounce from '../../../../hooks/useDebounce';
import { useState } from 'react';
import MainInfo from './MainInfo';

const Card = ({ transaction, setShowDelete, setShowImage }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);

	const toggleCard = useDebounce(() => {
		setIsOpen(!isOpen);
		setShowUpdate(false);
	});

	return (
		<AnimatePresence>
			<StyledCard
				open={isOpen}
				onClick={(e) => {
					e.stopPropagation();
					toggleCard();
				}}
				//framer motion
				transition={{ layout: { duration: 0.6, type: 'spring' } }}
				layout
				style={{
					borderRadius: '1rem',
					boxShadow: '0px, 10px 30px rgba(0,0,0,0.5)',
				}}
			>
				<MainInfo
					transaction={transaction}
					setShowDelete={setShowDelete}
					setShowImage={setShowImage}
					showUpdate={showUpdate}
					setShowUpdate={setShowUpdate}
					isOpen={isOpen}
				/>
				<MoreInfo
					isOpen={isOpen}
					showUpdate={showUpdate}
					transaction={transaction}
					setShowUpdate={setShowUpdate}
					setIsOpen={setIsOpen}
				/>
			</StyledCard>
		</AnimatePresence>
	);
};

export default Card;
