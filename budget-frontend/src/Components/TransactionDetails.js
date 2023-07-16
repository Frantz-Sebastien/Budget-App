import { useState, useEffect } from "react";
import { Link, useParams, withRouter, useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
console.log(API);

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => {
        navigate("/not-found");
      });
  }, [index, navigate]);
  
  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate(`/transactions`);
      })
      .catch((e) => console.error(e));
  };
  return (
    <article>
      <h3>
        {transaction.isFavorite ? <span>⭐️</span> : null} {transaction.name}
      </h3>
      <h5>
        <span>
          <a href={transaction.url}>{transaction.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {transaction.url}
      </h5>
      <h6>{transaction.amount}</h6>
      <p>{transaction.from}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;