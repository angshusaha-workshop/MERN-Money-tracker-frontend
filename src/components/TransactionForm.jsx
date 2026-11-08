import { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid title and amount");
      return;
    }

    const transaction = {
      title,
      amount: Number(amount),
      type,
    };

    const success = await onAddTransaction(transaction);

    if (success) {
      setTitle("");
      setAmount("");
      setType("income");
    }
  };

  return (
    <div className="form-card">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction Title</label>

          <input
            type="text"
            placeholder="e.g. Salary, Shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit" className="add-button">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;