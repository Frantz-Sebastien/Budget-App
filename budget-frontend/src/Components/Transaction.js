import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>
        {/* {transaction.isFavorite ? (
          <span>Withdrawal</span>
        ) : (
          <span>Deposit</span>
        )} */}
      </td>

      <td>{transaction.date}</td>
      
      <td>
      <Link to={`/transactions/${index}`}>{transaction.name}</Link>   
      </td>

      <td>{`$${transaction.amount}`}</td>
    </tr>
  );
}

export default Transaction;