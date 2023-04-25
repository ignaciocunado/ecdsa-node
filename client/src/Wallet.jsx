import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function changedKey(e) {
    const newPrivateKey = e.target.value;
    setPrivateKey(newPrivateKey)
  }

  

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>
      <label>
        Private Key
        <input placeholder="Type a valid private key for the wallet above" value={privateKey} onChange={changedKey} ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );

}

export default Wallet;
