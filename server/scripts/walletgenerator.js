const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes } = require("ethereum-cryptography/utils");



/*
Had to use newest version of Ethereum Cryptography Library to generate a random wallet
*/
function generateWallet(){ 
    const privateKey = secp.secp256k1.utils.randomPrivateKey()
    const publicKey = secp.secp256k1.getPublicKey(privateKey, false)
    const wallet = keccak256(publicKey.slice(1)).slice(-20)
    console.log("Wallet: " + toHex(wallet))
    console.log("Private Key: " + toHex(privateKey))
    return toHex(wallet)
}

/**
 * Checks if given key belongs to wallet
 * @param {} address 
 * @param {*} key 
 * @returns 
 */
function isKeyOfWallet(address, key) {
    if(key.length < 64) {
        return false;
    }
    let publicKey = secp.secp256k1.getPublicKey(hexToBytes(key), false)
    let generatedWalletFromPrivate = keccak256(publicKey.slice(1)).slice(-20)
    return address === toHex(generatedWalletFromPrivate)
}

module.exports = {
    generateWallet,
    isKeyOfWallet
}