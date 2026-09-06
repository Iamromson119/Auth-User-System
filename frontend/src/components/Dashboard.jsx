export default function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <div className="avatar">{user.name.trim().charAt(0).toUpperCase()}</div>
      <h2>Welcome, {user.name}</h2>
      <p>{user.email}</p>
      <p className="hint">This page loaded by sending your token to a protected route.</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}
