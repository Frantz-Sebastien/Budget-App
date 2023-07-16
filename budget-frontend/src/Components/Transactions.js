import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
console.log("here's the API url:")
console.log(API)

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((e) => console.error("catch", e));
  }, []);

  let totalAmount = 0;
  if (transactions) {
    totalAmount = transactions.reduce((total, transaction) => total + Number(transaction.amount), 0);
  }

  return (
    <div className="Transactions">
      <section>
      <h2>Bank Account Total: <span>${totalAmount.toFixed(2)}</span></h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Items</th>
              
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
