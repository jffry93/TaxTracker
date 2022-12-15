import { motion } from 'framer-motion';
import {
	StyledTitleContainer,
	StyledTitle,
} from '../../../../styles/StyledCard';

const CardTitle = ({ isOpen, showUpdate, transaction }) => {
	return (
		<StyledTitleContainer layout='position'>
			<StyledTitle open={isOpen}>{transaction.type.toUpperCase()}</StyledTitle>
			{!showUpdate && (
				<>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ opacity: { duration: 1, type: 'spring' } }}
							layout
						>
							<h2>Client</h2>
							<p>{transaction.client}</p>
						</motion.div>
					)}
					<h4>Item</h4>
					<p>{transaction.title}</p>
					<p className='title'>
						<strong>Amount: </strong>${transaction.amount} CAD
					</p>
				</>
			)}
		</StyledTitleContainer>
	);
};

export default CardTitle;
