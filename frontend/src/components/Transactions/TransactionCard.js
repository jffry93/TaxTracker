import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiDeleteBin6Fill, RiEditLine } from 'react-icons/ri';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import useDebounce from '../../hooks/useDebounce';
//fns package
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from 'react';
import { ImFilePicture } from 'react-icons/im';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import 'react-medium-image-zoom/dist/styles.css';
import '../../css/ImageZoom.css';
import UpdateTransaction from './UpdateTransaction';

const PurchaseCard = ({ transaction }) => {
	// console.log(transaction);
	const [youSure, setYouSure] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const { dispatch } = useTransactionContext();

	const handleDelete = async () => {
		const response = await fetch(
			`/api/transactions/${transaction._id}?public=${transaction.imageData.public_id}`,
			{
				method: 'DELETE',
				body: transaction,
			}
		);
		const json = await response.json();
		console.log(json);
		if (response.ok) {
			dispatch({
				type: 'DELETE_TRANSACTIONS',
				payload: json.transaction,
				paymentTotal: json.paymentTotal,
				purchaseTotal: json.purchaseTotal,
				provTax: json.provTax,
				fedTax: json.fedTax,
				postDeduction: json.postDeduction,
			});
			// setYouSure(true);
		}
	};

	const handleDebounceDelete = useDebounce(() => {
		handleDelete();
	}, 500);

	const dubCheckHandle = () => {
		setShowDelete(true);
		// setTimeout(() => {
		// 	console.log('timeout');
		// 	setShowDelete(false);
		// }, 2500);
	};

	return (
		<>
			<AnimatePresence>
				<StyledCard
					open={isOpen}
					transition={{ layout: { duration: 0.6, type: 'spring' } }}
					layout
					style={{
						borderRadius: '1rem',
						boxShadow: '0px, 10px 30px rgba(0,0,0,0.5)',
					}}
					onClick={(e) => {
						e.stopPropagation();
						setYouSure(true);
						setIsOpen(!isOpen);
						setShowUpdate(false);
					}}
				>
					<StyledUpper>
						<StyledTitleContainer layout='position'>
							<StyledTitle open={isOpen}>
								{transaction.type.toUpperCase()}
							</StyledTitle>
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
						{isOpen && (
							<StyledButtonContainer>
								<StyledActionDiv
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										width: { duration: 1, type: 'spring' },
										opacity: { duration: 1, type: 'spring' },
										borderRadius: { duration: 2, type: 'spring' },
									}}
									layout
									yousure={youSure.toString()}
									onClick={(e) => {
										e.stopPropagation();
										setShowUpdate(!showUpdate);
									}}
								>
									<div className='garbage-container'>
										<RiEditLine size={20} color='white' />
									</div>
								</StyledActionDiv>
								<StyledActionDiv
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										width: { duration: 1, type: 'spring' },
										opacity: { duration: 1, type: 'spring' },
										borderRadius: { duration: 2, type: 'spring' },
									}}
									layout
									yousure={youSure.toString()}
									onClick={(e) => {
										console.log('hello');
										e.stopPropagation();
										setShowImage(true);
										console.log(showImage);
									}}
								>
									<div className='garbage-container'>
										<ImFilePicture size={20} color='white' />
									</div>
								</StyledActionDiv>
								<StyledActionDiv
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										width: { duration: 1, type: 'spring' },
										opacity: { duration: 1, type: 'spring' },
										borderRadius: { duration: 2, type: 'spring' },
									}}
									layout
									yousure={youSure.toString()}
									onClick={(e) => {
										e.stopPropagation();
										dubCheckHandle();
									}}
								>
									{youSure ? (
										<div className='garbage-container'>
											<RiDeleteBin6Fill size={20} color='white' />
										</div>
									) : (
										<div
											className='confirm-container'
											onClick={(e) => {
												e.stopPropagation();
											}}
										>
											<p>Are you sure?</p>
										</div>
									)}
								</StyledActionDiv>
							</StyledButtonContainer>
						)}
					</StyledUpper>
					{isOpen ? (
						<StyledContent
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ opacity: { duration: 1.5, type: 'spring' } }}
							layout
						>
							{/* <p>{transaction.description}</p> */}
							{!showUpdate ? (
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Perferendis quibusdam natus ?
								</p>
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
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='more'
						>
							More Details
						</motion.p>
					)}
				</StyledCard>
			</AnimatePresence>
			<StyledModal
				open={showImage}
				onClose={(e) => {
					e.stopPropagation();
					setShowImage(false);
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<StyledBox>
					<img
						src={transaction.imageData.url}
						alt=''
						onClick={(e) => {
							e.stopPropagation();
							setShowImage(false);
						}}
					/>
				</StyledBox>
			</StyledModal>
			<StyledModal
				open={showDelete}
				onClose={(e) => {
					e.stopPropagation();
					setShowDelete(false);
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<StyledDeleteBox>
					<h2>This will permanently delete the data.</h2>
					<h2>Are you sure?</h2>
					<div className='button-container'>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleDebounceDelete();
							}}
						>
							Confirm
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowDelete(false);
							}}
						>
							Abort
						</button>
					</div>
				</StyledDeleteBox>
			</StyledModal>
		</>
	);
};

export default PurchaseCard;

const StyledButtonContainer = styled.div`
	display: flex;
	gap: 8px;
	/* border: 1px solid red; */
`;

const StyledModal = styled(Modal)`
	background-color: rgba(0, 0, 0, 0.7);
`;

const StyledBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	padding: 32px;
	img {
		width: 100%;
	}
`;

const StyledDeleteBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #1e1e1e;
	border-radius: 12px;
	padding: 48px 32px 60px;
	h2 {
		min-width: 250px;
	}
	h2:first-child {
		margin-bottom: 16px;
	}
	.button-container {
		display: flex;
		gap: 8px;
		margin-top: 32px;
		button {
			flex: 1;
		}
	}
`;
const StyledCard = styled(motion.div)`
	position: relative;
	overflow: hidden;
	background-color: var(--primary);
	padding: 16px 24px;
	width: ${(props) => {
		if (!props.open) {
			return 'clamp(220px, 50vw, 400px)';
		} else {
			return '100%';
		}
	}};
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	img {
		width: 150px;
	}
	img {
		width: 100%;
	}
	.more {
		margin-top: 8px;
		text-align: center;
	}
`;
const StyledUpper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	/* gap: 12px; */
	position: relative;
`;

const StyledContent = styled.div`
	position: relative;
	z-index: 1;
`;
const StyledTitleContainer = styled(motion.div)`
	width: 100%;
	/* border: 1px solid red; */
`;
const StyledTitle = styled.p`
	margin-bottom: 8px;
	font-size: 20px;
	font-weight: bold;
	/* border: 1px solid; */
	text-align: ${(props) => (props.open ? 'left' : 'center')};
`;

const StyledActionDiv = styled(motion.div)`
	/* position: absolute; */
	right: 0;
	background-color: var(--vivid-pink);
	border-radius: ${(props) => (props.yousure === 'true' ? '50%' : '18px')};
	.confirm-container {
		height: 35px;
		display: flex;
		align-items: center;
		padding: 0px 8px;
	}

	.garbage-container {
		height: 35px;
		width: 35px;
		/* border-radius: 50%; */

		cursor: pointer;

		position: relative;
		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

const StyledLower = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 16px;
`;
