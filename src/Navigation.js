import {Link} from "react-router-dom/cjs/react-router-dom";
const Navigation = ({prevBlockNumber, nextBlockNumber}) => {
  return (
    <nav className="Navigation">
      <Link to={`/block/${prevBlockNumber}`}>
        <button>prevBlock</button>
      </Link>{" "}
      <br />
      <Link to={`/block/${nextBlockNumber}`}>
        <button>nextBlock</button>
      </Link>
    </nav>
  );
};

export default Navigation;
