import { Component } from "react";

class DepositWithdraw extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      error: "",
    };
  }

  render() {
    const { type, handleBalance, handleToggle } = this.props;

    return (
      <div className="withdraw-section">
        <label htmlFor="withdraw-amount">Enter {type} Amount: </label>
        <input
          type="number"
          value={this.state.amount}
          onChange={(e) =>
            this.setState((prevState) => {
              return {
                ...prevState,
                amount: e.target.value,
              };
            })
          }
          id="withdraw-amount"
          min="0"
          step="1"
        />
        <button
          onClick={() => {
            const numAmount = Number(this.state.amount);
            let error = "";

            if (!numAmount || numAmount <= 0) {
              error = `Please enter a valid positive amount to ${type}.`;
            } else if (type === "withdraw" && numAmount > this.props.balance) {
              error = "Insufficient funds for withdrawal.";
            }

            if (error) {
              this.setState({ error });
              return;
            }

            this.setState({ error: "" });
            handleBalance(type, numAmount);
            handleToggle(
              type === "deposit" ? "toggleDeposit" : "toggleWithdraw"
            );
          }}
        >
          Complete {type}
        </button>
        <button
          onClick={() => {
            handleToggle(
              type === "deposit" ? "toggleDeposit" : "toggleWithdraw"
            );
          }}
        >
          Cancel
        </button>
        <p className="withdraw-error error hidden">{this.state.error}</p>
      </div>
    );
  }
}

export default DepositWithdraw;
