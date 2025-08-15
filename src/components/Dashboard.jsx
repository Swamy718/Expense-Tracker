import './Dashboard.css';
import { useState, useEffect } from 'react';
import MyPieChart from './MyPieChart';
import axios from 'axios';
import { AppWindow, HandCoins, WalletMinimal } from 'lucide-react';
import MyBarChart from './MyBarChart';

function Dashboard() {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [trans, setTrans] = useState([])
    const [recentincomes, setRecentIncomes] = useState([])
    const [recentexpenses, setRecentExpenses] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const [incomeLables, setIncomeLabels] = useState([])
    const [incomeValues, setIncomeValues] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setIncome(response.data['income'])
                    setExpenses(response.data['expense'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchRecentData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/recent-trans', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setTrans(response.data['view'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchIncomeData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/recent-incomes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setRecentIncomes(response.data['incomes'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchExpenseData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/recent-expenses', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setRecentExpenses(response.data['expenses'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchExpenseSubcategoryData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/expense/subcategory', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setSubcategory(response.data['expenses'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchLastDaysIncome = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://expense-tracker-backend-w8hm.onrender.com/income/last5days', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status !== 200) {
                    console.error("Error fetching data");
                } else {
                    setIncomeLabels(response.data['dates'])
                    setIncomeValues(response.data['incomes'])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
        fetchRecentData();
        fetchIncomeData();
        fetchExpenseData();
        fetchExpenseSubcategoryData();
        fetchLastDaysIncome();
    }, []);
    useEffect(() => {
        setBalance(income - expenses);
    }, [income, expenses]);

    const chartData = [
        { name: "Balance", value: balance },
        { name: "Income", value: income },
        { name: "Expenses", value: expenses }
    ];

    const expenseChartData = Object.entries(subcategory).map(([key, value]) => ({
        name: key,
        value: value
    }));
    return (
        <div className='dashboard'>
            <h2 className='dashboard-title'>Dashboard Page</h2>
            <div className='dashboard-content'>
                <div className='balance'>
                    <div className="balance-icon" style={{ backgroundColor: 'blue' }}><AppWindow /></div>
                    <div className="balance-view">
                        <h3>Total Balance: ${balance}</h3>
                    </div>
                </div>
                <div className='balance'>
                    <div className="balance-icon" style={{ backgroundColor: 'orange' }}><WalletMinimal /></div>
                    <div className="balance-view">
                        <h3>Total Income: ${income}</h3>
                    </div>

                </div>
                <div className='balance' >
                    <div className="balance-icon" style={{ backgroundColor: 'red' }}><HandCoins /></div>
                    <div className="balance-view">
                        <h3>Total Expenses: ${expenses}</h3>
                    </div>
                </div>
            </div>
            <div className="dashboard-interface">
                <div className="rt-card">
                    <h3>Recent Transactions</h3>
                    {trans.map((item, index) => (
                        <div key={index} className='rt-flow-card'>
                            <div className="rt-icon">
                                {item.emoji}
                            </div>
                            <div className="rt-source">
                                {item['type'] === 'income' && <p>{item.source}</p>}
                                {item['type'] === 'expense' && <p>{item.category}</p>}
                                <p>{item.source_date}</p>
                            </div>
                            {item['type'] === 'income' && <div className="rt-income-amount">
                                + {item.amount}
                            </div>}
                            {item['type'] === 'expense' && <div className="rt-expense-amount">
                                - {item.amount}
                            </div>}
                        </div>
                    ))}
                </div>
                <div className="overview-card">
                    <h3>Financial Overview</h3>
                    <div className='chart'>
                        <MyPieChart data={chartData} />
                    </div>
                </div>

                <div className="recent-incomes-card">
                    <h3>Recent Incomes</h3>
                    {recentincomes.map((item, index) => (
                        <div key={index} className='rt-flow-card'>
                            <div className="rt-icon">
                                {item.emoji}
                            </div>
                            <div className="rt-source">
                                <p>{item.source}</p>
                                <p>{item.source_date}</p>
                            </div>
                            <div className="rt-income-amount">
                                + {item.amount}
                            </div>
                        </div>
                    ))};
                </div>
                <div className="overview-card">
                    <h3>Last Few days Income</h3>
                    <div className='chart'>
                        <MyBarChart labels={incomeLables} values={incomeValues} />
                    </div>
                </div>
                <div className="overview-card">
                    <h3>Last Few days Expenses</h3>
                    <div className='chart'>
                        <MyPieChart data={expenseChartData} />
                    </div>
                </div>
                <div className="recent-expenses-card">
                    <h3>Recent Expenses</h3>
                    {recentexpenses.map((item, index) => (
                        <div key={index} className='rt-flow-card'>
                            <div className="rt-icon">
                                {item.emoji}
                            </div>
                            <div className="rt-source">
                                <p>{item.category}</p>
                                <p>{item.source_date}</p>
                            </div>
                            <div className="rt-expense-amount">
                                - {item.amount}
                            </div>
                        </div>
                    ))};
                </div>
            </div>

        </div>
    )
}

export default Dashboard