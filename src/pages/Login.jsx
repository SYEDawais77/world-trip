import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import NavLinks from "../components/NavLinks";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeUserAuth";
import { useNavigate } from "react-router";

export default function Login() {
  const { isAuthenticate, login } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    } else alert("Please enter both email and password");
  }

  useEffect(
    function () {
      if (isAuthenticate) {
        navigate("/app", {replace: true});
      }
    },
    [isAuthenticate, navigate]
  );
  return (
    <main className={styles.login}>
      <NavLinks />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="on"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="on"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
