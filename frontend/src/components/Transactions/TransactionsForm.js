import styled from 'styled-components';
import { RiErrorWarningLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import useDebounce from '../../hooks/useDebounce';
import { useAuth0 } from '@auth0/auth0-react';

const TransactionForm = () => {
  const { dispatch } = useTransactionContext();
  //form values
  const [client, setClient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('payment');
  //cloudinary
  const [imageValue, setImageValue] = useState('');
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  //MONGODB
  let transactions = {
    user: user.email,
    client,
    title,
    amount,
    description,
    type,
    imageValue,
    image,
  };

  const handleAddToDB = async () => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transactions),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setClient('');
      setTitle('');
      setAmount('');
      setDescription('');
      setImage(null);
      setImageValue('');
      setError(null);
      setEmptyFields([]);
      console.log('New Transactions added', json);
      dispatch({
        type: 'CREATE_TRANSACTIONS',
        payload: json.transaction,
        paymentTotal: json.paymentTotal,
        purchaseTotal: json.purchaseTotal,
      });
    }
  };

  const handleImgToBase64 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
      return reader;
    }
  };

  const handleDebounce = useDebounce(() => {
    handleAddToDB();
  }, 500);

  return (
    <StyledMain>
      <div>
        <button onClick={() => setType('payment')}>Invoice</button>
        <button onClick={() => setType('purchase')}>Receipt</button>
      </div>
      <h4>Add New Receipt</h4>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleDebounce();
        }}
      >
        <div className='form-container'>
          <label>Client:</label>
          <input
            type='text'
            onChange={(e) => setClient(e.target.value)}
            placeholder='Item on receipt'
            value={client}
          />

          <label className={emptyFields.includes('title') ? 'error-text' : ''}>
            {emptyFields.includes('title') ? (
              <div className='error-text'>
                <RiErrorWarningLine size={24} />
                <p>What'd you buy?</p>
              </div>
            ) : (
              'Purchase Title:'
            )}
          </label>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Item on receipt'
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
          <label className={emptyFields.includes('amount') ? 'error-text' : ''}>
            {emptyFields.includes('amount') ? (
              <div className='error-text'>
                <RiErrorWarningLine size={24} />
                <p>How much moneyz was it?</p>
              </div>
            ) : (
              'Amount CAD:'
            )}
          </label>
          <input
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Amount spent'
            value={amount}
            className={emptyFields.includes('amount') ? 'error' : ''}
          />
          <label
            className={emptyFields.includes('description') ? 'error-text' : ''}
          >
            {emptyFields.includes('description') ? (
              <div className='error-text'>
                <RiErrorWarningLine size={24} />
                <p>Why'd you spend moneyz?</p>
              </div>
            ) : (
              'Description:'
            )}
          </label>
          <input
            type='text'
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Purpose for purchase'
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
          />

          <label className={emptyFields.includes('image') ? 'error-text' : ''}>
            {emptyFields.includes('image') ? (
              <div className='error-text'>
                <RiErrorWarningLine size={24} />
                <p>Add some proof</p>
              </div>
            ) : (
              'Document:'
            )}
          </label>
          <input
            value={imageValue}
            className={emptyFields.includes('image') ? 'error' : ''}
            type='file'
            accept='image/*'
            onChange={(e) => {
              setImage(handleImgToBase64(e.target.files[0]));
              setImageValue(e.target.value);
            }}
          />

          <button>Add Purchase</button>
          {emptyFields.length ? (
            <div className='error-message'>
              <RiErrorWarningLine size={24} />
              <p>{error}</p>
              <RiErrorWarningLine size={24} />
            </div>
          ) : (
            ''
          )}
        </div>
      </StyledForm>
      {image && <img src={image} alt='chosen' />}
    </StyledMain>
  );
};

export default TransactionForm;

const StyledMain = styled.div`
  flex: 1;
  width: 100%;
`;

const StyledForm = styled.form`
  .form-container {
    position: sticky;
    top: 92px;

    display: flex;
    flex-direction: column;

    padding: 32px 16px;

    border-radius: 8px;
    background-color: #615d6c;
    color: white;

    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    h4 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 16px;
    }
    label {
      margin-bottom: 2px;
    }
    input {
      margin: 0 0 12px 0;
    }

    input::placeholder {
      font: 16px/3 sans-serif;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
    .error {
      border: 3px solid var(--vivid-pink);
      border-radius: 8px;
    }
    .error-text {
      color: var(--vivid-pink);
      display: flex;
      gap: 8px;
    }
    .error-message {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      border-radius: 8px;
      background-color: var(--vivid-pink);
      color: var(--off-white);

      margin-top: 16px;
      padding: 32px 16px;

      text-align: center;
      font-size: 17px;
      .rotate {
        transform: rotate(180deg);
      }
    }
  }
`;
