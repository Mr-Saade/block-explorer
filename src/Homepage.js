import {useEffect, useState} from "react";
import BlocksList from "./BLocksList";
import HomepageTxList from "./HomepageTxList";

const Homepage = ({alchemy}) => {
  const [blockNumber, setBlockNumber] = useState("");
  const [blocks, setBlocks] = useState([]);

  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const fetchedBlocks = await Promise.all(
          Array.from({length: 10}, (_, index) => {
            return alchemy.core.getBlock(latestBlockNumber - index);
          })
        );
        const blockTx = await alchemy.core.getBlockWithTransactions(
          latestBlockNumber
        );
        const latestTransactions = await blockTx.transactions
          .slice(0, 10)
          .map((tx) => {
            return {
              ...tx,
            };
          });

        setisPending(false);
        setBlockNumber(latestBlockNumber);
        setBlocks(fetchedBlocks);
        setTransactions(latestTransactions);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    fetchBlocks();
  }, [alchemy.core]);
  return (
    <div className="Homepage">
      {error && <div>{error}</div>}
      {isPending && <div>Loading....</div>}
      <div>Latest Block Number: {blockNumber}</div>
      <BlocksList blocks={blocks} title="LATEST BLOCKS" /> <br />
      <HomepageTxList
        error={error}
        title="LATEST TRANSACTIONS"
        transactions={transactions}
      />
    </div>
  );
};

export default Homepage;
