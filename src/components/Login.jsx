import { Component } from "react";

class Login extends Component {
  render() {
    const { handleLogin, handleInput, emailInput, passwordInput, error } =
      this.props;
    return (
      <div className="login-section">
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={emailInput}
          onChange={(e) => handleInput("emailInput", e.target.value)}
          id="email"
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => handleInput("passwordInput", e.target.value)}
          id="password"
          required
        />
        <button onClick={() => handleLogin()}>Login</button>
        <p className="login-error error hidden">{error}</p>
      </div>
    );
  }
}

export default Login;
