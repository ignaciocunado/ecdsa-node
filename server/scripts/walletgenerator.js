const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");


/*
Had to use newest version of Ethereum Cryptography Library
*/
function generateWallet(){ 
    const privateKey = secp.secp256k1.utils.randomPrivateKey()
    const publicKey = secp.secp256k1.getPublicKey(privateKey, false)
    const wallet = keccak256(publicKey.slice(1)).slice(-20)
    console.log("Wallet: " + toHex(wallet))
    console.log("Private Key: " + toHex(privateKey))
    return toHex(wallet)
    // const signature = secp.secp256k1.sign(keccak256(utf8ToBytes("transaction")), privateKey)
    // console.log("Signature R: " + signature.r)
    // console.log("Signature S: " + signature.s)
    
}

module.exports = generateWallet;