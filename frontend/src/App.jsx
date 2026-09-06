import { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

const API = "http://localhost:5000";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setChecking(false);
      return;
    }

    fetch(API + "/profile", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setUser(data);
        else localStorage.removeItem("token");
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    setUser({ name: data.name, email: data.email });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMode("login");
  };

  if (checking) return null;

  return (
    <div className="page">
      <div className="card">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <>
            <div className="tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Log in
              </button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
            {mode === "login" ? (
              <LoginForm api={API} onLogin={handleLogin} />
            ) : (
              <RegisterForm api={API} onRegistered={() => setMode("login")} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
