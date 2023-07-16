import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


function TransactionNewForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    name: "",
    date: "",
    number: "",
    isFavorite: false,
    from: "",
  });

  const addTransaction = (newTransaction) => {
    axios
    .post(`${API}/transactions`, newTransaction)
    .then(
    () => {
    navigate(`/transactions`);
    })
    .catch((c) => console.error("catch", c));
   };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, isFavorite: !transaction.isFavorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction)
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          required
          value={transaction.date}
          placeholder="date"
          onChange={handleTextChange}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={transaction.name}
          type="text"
          onChange={handleTextChange}
          placeholder="name"
          required
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
          placeholder="from"
        />
        <br />
        <input type="submit" value = "Create New Item"/>
      </form>
    </div>
  );
}

export default TransactionNewForm;