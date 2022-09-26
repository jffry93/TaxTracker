import styled from 'styled-components';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import Divider from '@mui/material/Divider';

const ChartInfo = () => {
  const { paymentTotal, fedTax, provTax, purchaseTotal, postDeduction } =
    useTransactionContext();
  return (
    <StyledContainer>
      <h2>Data</h2>
      <Divider />
      <div className='container'>
        <strong>Gross:</strong>
        <h2>${Math.floor(paymentTotal)}</h2>
      </div>
      <div className='container'>
        <strong>Fed Tax:</strong>
        <h2>${Math.floor(fedTax)}</h2>
      </div>
      <div className='container'>
        <strong>Prov Tax:</strong>
        <h2>${Math.floor(provTax)}</h2>
      </div>
      <Divider />
      <div className='container'>
        <strong>Expense:</strong>
        <h2>${Math.floor(purchaseTotal)}</h2>
      </div>
      <Divider />
      <div className='container'>
        <strong>Net:</strong>
        <h2>${Math.floor(postDeduction)}</h2>
      </div>
    </StyledContainer>
  );
};

export default ChartInfo;

const StyledContainer = styled.div`
  width: 100%;
  padding: 16px 32px;

  .container {
    padding: 0;
    margin: 16px 8px;
    display: flex;
    justify-content: space-between;
  }
`;
