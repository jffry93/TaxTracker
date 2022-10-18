import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import useDebounce from '../../hooks/useDebounce';
//fns package
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from 'react';

const PurchaseCard = ({ transaction }) => {
  console.log(transaction);
  const [isOpen, setIsOpen] = useState(false);
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
    }
  };

  const handleDebounceDelete = useDebounce(() => {
    handleDelete();
  }, 500);

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
            setIsOpen(!isOpen);
          }}
        >
          <StyledUpper>
            <motion.div layout='position'>
              <strong>{transaction.type}</strong>
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
            </motion.div>
            {isOpen && (
              <div
                className='garbage-container'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDebounceDelete();
                }}
              >
                <RiDeleteBin6Fill size={20} color='white' />
              </div>
            )}
          </StyledUpper>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.5, type: 'spring' } }}
              layout
            >
              {/* <p>{transaction.description}</p> */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis quibusdam natus ?
              </p>
              <StyledLower>
                <p className='time-stamp'>
                  {formatDistanceToNow(new Date(transaction.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <div className='image-container'>
                  <img src={transaction.imageData.url} alt='' />
                </div>
              </StyledLower>
            </motion.div>
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
    </>
  );
};

export default PurchaseCard;

const StyledCard = styled(motion.div)`
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
    width: 64px;
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
  .garbage-container {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: var(--vivid-pink);
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
  justify-content: space-between;
  align-items: flex-end;
`;
