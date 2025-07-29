import { Component } from "react";

class Transaction extends Component {
  render() {
    const { transaction } = this.props;
    // Get the last 5 transactions, most recent first
    const recentTransactions = transaction.slice(-5).reverse();

    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul className="transaction-list">
          {recentTransactions.length === 0 ? (
            <li>No transactions yet.</li>
          ) : (
            recentTransactions.map((t, idx) => (
              <li key={idx}>
                {t.type.charAt(0).toUpperCase() + t.type.slice(1)}: ${t.amount}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default Transaction;
