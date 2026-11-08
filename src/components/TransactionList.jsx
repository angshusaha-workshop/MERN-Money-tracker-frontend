function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="list-card">
      <h2>Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="empty-message">
          No transactions yet.
        </p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div
              className="transaction-item"
              key={transaction._id}
            >
              <div className="transaction-info">
                <h3>{transaction.title}</h3>

                <p>
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="transaction-actions">
                <span
                  className={
                    transaction.type === "income"
                      ? "income-amount"
                      : "expense-amount"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}
                  ৳{transaction.amount.toLocaleString()}
                </span>

                <button
                  className="delete-button"
                  onClick={() =>
                    onDeleteTransaction(transaction._id)
                  }
                  aria-label={`Delete ${transaction.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;