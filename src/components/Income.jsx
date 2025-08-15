import './Income.css';
import MyBarChart from './MyBarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { Trash2, X } from "lucide-react";

function Income() {
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState(0)
  const [icon, setIcon] = useState('💰')
  const [date, setDate] = useState('')
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])
  const [incomes, setIncomes] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://expense-tracker-backend-e1eq.onrender.com/income/last10days', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status !== 200) {
          console.error("Error fetching data");
        } else {
          setLabels(response.data['dates'])
          setValues(response.data['incomes'])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchIncomeData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('https://expense-tracker-backend-e1eq.onrender.com/income', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status !== 200) {
          console.error("Error fetching data");
        } else {
          setIncomes(response.data['incomes'])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    fetchIncomeData();
  }, [refresh]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post('https://expense-tracker-backend-e1eq.onrender.com/income',
        {
          amount: amount,
          source: source,
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
      if (response.status == 200) {
        alert("added successfully")
        setRefresh(!refresh);
      }
    }
    catch (error) {
      console.error("Error adding income:", error.response?.data || error.message);
    }

  }

  const deleteIncome = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`https://expense-tracker-backend-e1eq.onrender.com/income?income_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status == 200) {
        alert("Income deleted successfully")
        setRefresh(!refresh);
      }
    }
    catch (error) {
      console.error("Error while deleteing income:", error.response?.data || error.message);
    }
  }
  return (
    <div className="income-page">
      {showForm && (
        <div className="income-form">
          <div className="income-form-title">
            <h2>Add Income</h2>
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
                  width="90%"
                  height={400}
                />
              </div>
            )}
            <label>Income Source</label>
            <input type="text" placeholder="Income Type" value={source} onChange={(e) => setSource(e.target.value)} />
            <label>Amount</label>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Date</label>
            <input type="date" placeholder="Income Type" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type='submit'className='income-button'>Add Income</button>
          </form>
        </div>
      )}

      <div className="income-nav">
        <h1>Income Overview</h1>
        <button onClick={() => setShowForm(true)}>+    Add Income</button>
      </div>
      <div className="income-chart">
        <MyBarChart labels={labels} values={values} />
      </div>
      <div>
        <h2 style={{ marginLeft: '50px' }}>Income Sources</h2>
        <div className='income-flow'>
          {incomes.map((item, index) => (
            <div key={index} className='flow-card'>
              <div className="flow-icon">
                {item.emoji}
              </div>
              <div className="flow-source">
                <p>{item.source}</p>
                <p>{item.date}</p>
              </div>
              <div className="flow-delete">
                <button onClick={() => deleteIncome(item.id)}><Trash2 /></button>
              </div>
              <div className="flow-amount">
                + {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Income;
