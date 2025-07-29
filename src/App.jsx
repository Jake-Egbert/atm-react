import { Component } from "react";

import Navbar from "./components/Navbar";
import Atm from "./components/atm/Atm";
import Login from "./components/Login";

import "./styles/main.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          firstName: "Jake",
          lastName: "Egbert",
          email: "j.com",
          password: "1234",
          balance: 0,
          transaction: [],
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@doe.com",
          password: "abcd",
          balance: 100,
          transaction: [],
        },
      ],
      loggedIn: false,
      currentUserIndex: null,
      emailInput: "",
      passwordInput: "",
      error: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
  }

  handleLogin = () => {
    const { emailInput, passwordInput, users } = this.state;
    const userIndex = users.findIndex(
      (u) => u.email === emailInput && u.password === passwordInput
    );
    if (userIndex !== -1) {
      this.setState({
        loggedIn: true,
        currentUserIndex: userIndex,
        emailInput: "",
        passwordInput: "",
        error: "",
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          error: "Invalid email or password",
        };
      });
    }
  };

  handleLogout = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        emailInput: "",
        passwordInput: "",
        loggedIn: false,
      };
    });
  };

  handleInputChange = (type, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [type]: value,
      };
    });
  };

  handleBalanceChange = (type, value) => {
    this.setState((prevState) => {
      const users = [...prevState.users];
      const user = { ...users[prevState.currentUserIndex] };

      const newTransaction = [...user.transaction, { type, amount: value }];

      if (type === "withdraw") {
        user.balance -= Number(value);
      } else if (type === "deposit") {
        user.balance += Number(value);
      }

      user.transaction = newTransaction;
      users[prevState.currentUserIndex] = user;
      return { users };
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        {!this.state.loggedIn && (
          <Login
            handleLogin={this.handleLogin}
            handleInput={this.handleInputChange}
            emailInput={this.state.emailInput}
            passwordInput={this.state.passwordInput}
            error={this.state.error}
          />
        )}
        {this.state.loggedIn && (
          <Atm
            logout={this.handleLogout}
            handleBalance={this.handleBalanceChange}
            balance={this.state.users[this.state.currentUserIndex].balance}
            transaction={
              this.state.users[this.state.currentUserIndex].transaction
            }
          />
        )}
      </div>
    );
  }
}

export default App;
