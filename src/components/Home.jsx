import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>💰 Expense Tracker</h1>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h2>Track Your Expenses Effortlessly</h2>
          <p>
            Manage your income and expenses with beautiful charts, smart
            insights, and a clean interface.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/signup" className="btn btn-signup">Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Finance" />
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 Expense Tracker | Built by Swamy</p>
        <div className="social-links">
          <a href="https://linkedin.com/in/swamy-pothabattula" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/Swamy718" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
