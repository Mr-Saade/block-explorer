import {utils} from "ethers";

const HomepageTxList = ({error, title, transactions}) => {
  return (
    <div className="HomepageTxList">
      {error && <div>{error}</div>}
      <h2>{title}</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.hash}>
            <div className="txPreview">
              <p>Tx Value: {utils.formatEther(tx.value)}</p>
              <p>From: {tx.from.toString()}</p>
              <p>To: {tx.to.toString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomepageTxList;
