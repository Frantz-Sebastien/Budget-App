import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  let { index } = useParams();
  let navigate = useNavigate()

  const [transaction, setTransaction] = useState({
    name: "",
    date: "",
    amount: "",
    from: "",
    isFavorite: false,
  });

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, isFavorite: !transaction.isFavorite });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => console.error(e));
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction()
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={transaction.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={transaction.date}
          placeholder="date"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          placeholder="amount"
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={transaction.isFavorite}
        />
        <label htmlFor="from">From</label>
        <textarea
          id="from"
          name="from"
          value={transaction.from}
          onChange={handleTextChange}
          placeholder="Describe why you transactioned this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
