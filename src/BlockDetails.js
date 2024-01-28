import {Link} from "react-router-dom/cjs/react-router-dom";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useState, useEffect} from "react";
import Navigation from "./Navigation";

const BlockDetails = ({alchemy}) => {
  const {blockNumber} = useParams();
  const [expand, setExpand] = useState(false);
  const [block, setBlock] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [prevBlockNumber, setPrevBlockNumber] = useState(null);
  const [nextBlockNumber, setNextBlockNumber] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const abrtCont = new AbortController();
    const fetchBlockDetails = async () => {
      try {
        const blockDetails = await alchemy.core.getBlock(parseInt(blockNumber));

        const prevBlock = await alchemy.core.getBlock(
          parseInt(blockDetails.number, 10) - 1
        );
        const nextBlock = await alchemy.core.getBlock(
          parseInt(blockDetails.number, 10) + 1
        );
        if (isMounted) {
          setisPending(false);
          setBlock(blockDetails);
          setPrevBlockNumber(prevBlock ? prevBlock.number : null);
          setNextBlockNumber(nextBlock ? nextBlock.number : null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching block details:", error.message);
          setError(error.message);
        } else {
          setError(error);
        }
      }
    };
    fetchBlockDetails();
    return () => {
      isMounted = false;
      abrtCont.abort();
    };
  }, [alchemy.core, blockNumber]);

  return (
    <div className="blockDetails">
      {error && <div>{error}</div>}
      {isPending && <div>Loading....</div>}
      {block && (
        <div>
          <Navigation
            prevBlockNumber={prevBlockNumber}
            nextBlockNumber={nextBlockNumber}
          />
          <h2>Block # {parseInt(blockNumber, 16)}</h2>
          <p>Block Height: {parseInt(block.number, 16)} </p>
          <p>
            Block Timestamp:
            {new Date(parseInt(block.timestamp, 16) * 1000).toLocaleString()}
          </p>
          <p>
            <Link to={`/transactions/${blockNumber}`}>
              {block.transactions.length} transactions
            </Link>
          </p>

          <p>Gas Used: {block.gasUsed.toString()}</p>
          <p>Gas Limit: {block.gasLimit.toString()}</p>
          <button onClick={() => setExpand(!expand)}>
            {expand ? "Hide" : "Expand"}
          </button>
          {expand && (
            <div>
              <p>Block Hash: {block.hash.toString()}</p>
              <p>Block ParentHash : {block.parentHash.toString()}</p>
              <p>Block ExtraData : {block.extraData.toString()}</p>
              <p>Block Miner : {block.miner.toString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
