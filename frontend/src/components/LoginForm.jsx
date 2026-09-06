import { useState } from "react";

export default function LoginForm({ api, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await fetch(api + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      onLogin(data);
    } else {
      setMsg(data.msg);
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>
      {msg && <p className="msg">{msg}</p>}
    </form>
  );
}
