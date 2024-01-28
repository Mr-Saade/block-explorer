import {Link} from "react-router-dom/cjs/react-router-dom";
const BlocksList = ({blocks, title}) => {
  return (
    <div className="blocksList">
      <h2>{title}</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.number}>
            <div className="blockPreview">
              <Link to={`/block/${block.number}`}>
                <button>Block #{block.number}</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlocksList;
