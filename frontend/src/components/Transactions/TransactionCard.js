import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useTransactionContext } from '../../hooks/useTransactionHook';
//fns package
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Image } from 'cloudinary-react';
import DisplayImg from '../Cloudinary/DisplayImg';

const PurchaseCard = ({ transaction }) => {
  // console.log(transaction.imageData);
  const { dispatch } = useTransactionContext();

  const handleClick = async () => {
    const response = await fetch('/api/transactions/' + transaction._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TRANSACTIONS', payload: json });
    }
  };

  return (
    <StyledPurchaseCard>
      <div className='card-container'>
        <div className='left-side'>
          <h4 className='title'>Client</h4>
          <p>{transaction.client}</p>

          <h4 className='title'>Item</h4>
          <p>{transaction.title}</p>

          <p className='title'>
            <strong>Amount: </strong>${transaction.amount} CAD
          </p>
          <h4 className='title'>Details</h4>
          <p>{transaction.description}</p>
        </div>
        <div className='right-side'>
          <div className='garbage-container' onClick={handleClick}>
            <RiDeleteBin6Fill size={20} color='white' />
          </div>
          {/* <Image cloudName='dcfqlsnzh' publicId={transaction.imageData.url} /> */}
        </div>
      </div>
      <p className='time-stamp'>
        {/* date-fns library */}
        {formatDistanceToNow(new Date(transaction.createdAt), {
          addSuffix: true,
        })}
      </p>
    </StyledPurchaseCard>
  );
};

export default PurchaseCard;

const StyledPurchaseCard = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px 16px 16px;

  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  background-color: var(--misty-rose);

  .card-container {
    display: flex;
    h4,
    strong {
      color: var(--vivid-pink);
    }
    p,
    .time-stamp {
      font-size: 18px;
      font-weight: 400;
      color: white;
    }
    .title {
      margin-top: 8px;
    }
  }
  .left-side {
    flex: 3;
  }
  .right-side {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  .garbage-container {
    cursor: pointer;
    background-color: var(--vivid-pink);
    border-radius: 50%;

    padding: 8px;
    display: flex;
  }
  .time-stamp {
    display: flex;
    justify-content: flex-end;

    margin-top: 8px;

    color: var(--vivid-pink);
  }
`;
