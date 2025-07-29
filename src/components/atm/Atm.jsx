import { Component } from "react";
import { toast } from "react-toastify";

import DepositWithdraw from "./DepositWithdraw";
import Transaction from "./Transaction";

class Atm extends Component {
  constructor() {
    super();
    this.state = {
      toggleDeposit: false,
      toggleWithdraw: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = (type) => {
    this.setState((prevState) => {
      return {
        [type]: !prevState[type],
      };
    });
  };

  componentDidMount() {
    this.inactivityTimer = setTimeout(() => {
      this.props.logout();
    }, 60000);
  }

  componentWillUnmount() {
    toast.info("ATM closed. Goodbye!");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.balance !== this.props.balance) {
      localStorage.setItem("balance", this.props.balance);
    }
  }

  render() {
    const { logout, balance, handleBalance, transaction } = this.props;

    return (
      <div className="atm-menu">
        <p className="user-greeting"></p>
        <p className="balance-display">{balance}</p>
        <button onClick={() => this.handleToggle("toggleDeposit")}>
          Deposit Money
        </button>
        {this.state.toggleDeposit && (
          <DepositWithdraw
            type="deposit"
            handleBalance={handleBalance}
            handleToggle={this.handleToggle}
            balance={balance}
          />
        )}
        <button onClick={() => this.handleToggle("toggleWithdraw")}>
          Withdraw Money
        </button>
        {this.state.toggleWithdraw && (
          <DepositWithdraw
            type="withdraw"
            handleBalance={handleBalance}
            handleToggle={this.handleToggle}
            balance={balance}
          />
        )}
        <Transaction transaction={transaction} />
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }
}

export default Atm;
