import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";

const BlockTxList = ({alchemy}) => {
  const {blockNumber} = useParams();
  const [transactions, setTransactions] = useState([]);

  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const abrtCont = new AbortController();
    const fetchBlockTransactions = async () => {
      try {
        const blockDetails = await alchemy.core.getBlockWithTransactions(
          parseInt(blockNumber)
        );
        if (!blockDetails) {
          setError("Block details not found");
          return;
        }
        if (isMounted) {
          setisPending(false);

          setTransactions(blockDetails.transactions);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        } else {
          setError(error);
        }
      }
    };
    fetchBlockTransactions();
    return () => {
      isMounted = false;
      abrtCont.abort();
    };
  }, [alchemy.core, transactions, blockNumber]);

  return (
    <div className="TransactionsList">
      {error && <div>{error}</div>}
      {isPending && <div>Loading....</div>}

      {<h2>Transactions</h2>}
      {transactions && (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <p>Tx Hash: {transaction.hash}</p>
              <p>Block #: {transaction.blockNumber}</p>
              <p>Tx Value: {parseInt(transaction.value.hex, 16)}</p>
              <p>From: {transaction.from.toString()}</p>
              <p>To: {transaction.to.toString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlockTxList;
