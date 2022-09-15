import styled from 'styled-components';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useTransactionContext } from '../../hooks/useTransactionHook';
//fns package
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Image } from 'cloudinary-react';
import DisplayImg from '../Cloudinary/DisplayImg';

const PurchaseCard = ({ transaction }) => {
  const { dispatch } = useTransactionContext();

  const handleClick = async () => {
    const response = await fetch('/api/transactions/' + transaction._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: 'DELETE_TRANSACTIONS',
        payload: json.transaction,
        paymentTotal: json.paymentTotal,
        purchaseTotal: json.purchaseTotal,
      });
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
    justify-content: space-between;
    .left-side {
      min-width: 270px;

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
    .right-side {
      position: relative;
      top: 0;

      .garbage-container {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        background-color: var(--vivid-pink);
        cursor: pointer;

        position: absolute;
        top: 0%;
        right: 0%;
        transform: translate(-0%, -0%);
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  /* .right-side {
    border: 1px solid black;
    display: flex;
    flex-direction: row-reverse;
  }
  .garbage-container {
    height: 35px;
    width: 35px;
    cursor: pointer;
    background-color: var(--vivid-pink);
    border-radius: 50%;
    position: relative;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  } */
  .time-stamp {
    display: flex;
    justify-content: flex-end;

    margin-top: 8px;

    color: var(--vivid-pink);
  }
`;
