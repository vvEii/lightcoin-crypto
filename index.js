class Account {
  constructor() {
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (const t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction {
  constructor(amount, account) {
    this.account = account;
    this.amount = amount;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  isAllowed() {
    return this.account.balance >= this.amount;
  }
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  isAllowed() {
    return true;
  }
  get value() {
    return this.amount;
  }
}

// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account();

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);
console.log("Lookings like I'm broke again");
console.log("Account Transaction History: ", myAccount.transactions);
