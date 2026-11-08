import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";

import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/transactions`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      setError("");

      const response = await axios.get(API_URL);

      setTransactions(response.data);
    } catch (error) {
      console.error(error);

      setError("Unable to load transactions. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Add Transaction
  const addTransaction = async (transaction) => {
    try {
      await axios.post(API_URL, transaction);

      await fetchTransactions();

      return true;
    } catch (error) {
      console.error(error);

      alert("Failed to add transaction");

      return false;
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      await fetchTransactions();
    } catch (error) {
      console.error(error);

      alert("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Money Tracker</h1>
          <p>Manage your income and expenses</p>
        </div>
      </header>

      <main className="container">
        <SummaryCards transactions={transactions} />

        <div className="dashboard-grid">
          <TransactionForm onAddTransaction={addTransaction} />

          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
        </div>

        {loading && (
          <p className="status-message">
            Loading transactions...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}
      </main>

      <footer className="footer">
        <p>Money Tracker | Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;