import styled from 'styled-components';
import { useEffect } from 'react';
import { useTransactionContext } from '../hooks/useTransactionHook';
import { useStyleContext } from '../hooks/useStyleHook';
import { useAuth0 } from '@auth0/auth0-react';

//components
import TransactionForm from '../components/Transactions/TransactionsForm';
import TransactionCard from '../components/Transactions/TransactionCard';
import PieChart from '../components/Chartjs/PieChart';

const Home = () => {
  const { transactions, dispatch } = useTransactionContext();
  const { viewWidth, mobileBreakpoint } = useStyleContext();
  const { user, isAuthenticated, isLoading } = useAuth0();

  //------FETCH TRANCTION DATA -------//
  //GET REQUEST
  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await fetch('/api/transactions/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: 'SET_TRANSACTIONS',
          transactions: json.transactions,
          paymentTotal: json.paymentTotal,
          purchaseTotal: json.purchaseTotal,
        });
      }
    };
    if (isAuthenticated) {
      fetchTransaction();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      {isAuthenticated && transactions && (
        <StyledHome>
          <div className='transactions'>
            {transactions &&
              transactions.map((transaction) => {
                // console.log(transaction);
                return (
                  <TransactionCard
                    key={transaction._id}
                    transaction={transaction}
                  />
                );
              })}
          </div>
          <div>
            <PieChart />
            {viewWidth > mobileBreakpoint ? <TransactionForm /> : ''}
          </div>
        </StyledHome>
      )}
    </>
  );
};

export default Home;

const StyledHome = styled.div`
  display: flex;
  gap: 32px;

  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 32px 32px;
  div:first-child {
    flex: 3;
  }
  div:last-child {
    flex: 2;
  }
  .transactions {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  form,
  .transactions {
    flex: 1;
  }
  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
`;
