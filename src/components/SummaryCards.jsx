function SummaryCards({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  return (
    <div className="summary-grid">
      <div className="summary-card balance-card">
        <p>Total Balance</p>
        <h2>৳{balance.toLocaleString()}</h2>
      </div>

      <div className="summary-card income-card">
        <p>Total Income</p>
        <h2>৳{income.toLocaleString()}</h2>
      </div>

      <div className="summary-card expense-card">
        <p>Total Expense</p>
        <h2>৳{expense.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;