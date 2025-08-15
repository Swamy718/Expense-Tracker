import './Expense.css';
import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { Trash2, X } from "lucide-react";

function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [icon, setIcon] = useState('💰')
  const [date, setDate] = useState('')
  const [refresh, setRefresh] = useState(false);
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])
  const [expenses, setExpenses] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://expense-tracker-backend-e1eq.onrender.com/expense/last10days', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status !== 200) {
          console.error("Error fetching data");
        } else {
          setLabels(response.data['dates'])
          setValues(response.data['expenses'])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchExpenseData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://expense-tracker-backend-e1eq.onrender.com/expense', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status !== 200) {
          console.error("Error fetching data");
        } else {
          setExpenses(response.data['expenses'])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    fetchExpenseData();
  }, [refresh]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post('https://expense-tracker-backend-e1eq.onrender.com/expense',
        {
          amount: amount,
          category: category,
          subcategory: subcategory,
          emoji: icon,
          source_date: date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status == 201) {
        alert("added successfully")
        setRefresh(!refresh);
      }
    }
    catch (error) {
      console.error("Error adding expense:", error.response?.data || error.message);
    }
  }
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`https://expense-tracker-backend-e1eq.onrender.com/expense?expense_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status == 200) {
        alert("Expense deleted successfully")
        setRefresh(!refresh);
      }
    }
    catch (error) {
      console.error("Error while deleteing expense:", error.response?.data || error.message);
    }
  }
  return (
    <div className="expense-page">
      {showForm && (
        <div className="expense-form">
          <div className="expense-form-title">
            <h2>Add Expense</h2>
            <h3 onClick={() => setShowForm(false)}>X</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <label>Pick Icon</label>
            <div style={{ fontSize: "2rem", cursor: "pointer" }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              {icon}
            </div>
            {showEmojiPicker && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  width: "400px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <X
                    style={{ cursor: "pointer", color: "#666" }}
                    onClick={() => setShowEmojiPicker(false)}
                  />
                </div>
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setIcon(emojiData.emoji);
                    setShowEmojiPicker(false);
                  }}
                  width="100%"
                  height={400}
                />
              </div>
            )}
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            <label>Sub-Category</label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
            <label>Amount</label>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Date</label>
            <input type="date" placeholder="Income Type" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type='submit' className='expense-button'>Add Expense</button>
          </form>
        </div>
      )}

      <div className="expense-nav">
        <h1>Expense Overview</h1>
        <button onClick={() => setShowForm(true)}>+    Add Expense</button>
      </div>
      <div className="expense-chart">
        <LineChart labels={labels} values={values} />
      </div>
      <div>
        <h2 style={{ marginLeft: '50px' }}>Expenses</h2>
        <div className='expense-flow'>
          {expenses.map((item, index) => (
            <div key={index} className='expense-flow-card'>
              <div className="expense-flow-icon">
                {item.emoji}
              </div>
              <div className="expense-flow-source">
                <p>{item.source}</p>
                <p>{item.date}</p>
              </div>
              <div className="expense-flow-delete">
                <button onClick={() => deleteExpense(item.id)}><Trash2 /></button>
              </div>
              <div className="expense-flow-amount">
                - {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Expenses;
