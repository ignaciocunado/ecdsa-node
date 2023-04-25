const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const walletgenerator = require("./scripts/walletgenerator.js")
const generateWallet = walletgenerator.generateWallet
const isKeyOfWallet = walletgenerator.isKeyOfWallet

app.use(cors());
app.use(express.json());

const balances = {
};
/**
 * Generate new wallets with generator and set the balances
 */
balances[generateWallet()] = 100;
balances[generateWallet()] = 75;
balances[generateWallet()] = 50;


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, privateKey, amount, recipient } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else if(!isKeyOfWallet(sender, privateKey)) {
    res.status(400).send({message: "Unauthorised, please provide a valid private key"})
  }
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

