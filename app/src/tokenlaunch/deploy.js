import ERC20Token from "../contracts/ERC20Token.json"
import CrowdsaleSimple from "../contracts/CrowdsaleSimple.json"

export const deployERC20 = ({
  web3,
  tokenName,
  tokenSymbol,
  tokenSupply,
  tokenDecimals
}) => {
  // Deploy using web3
  const web3Contract = new web3.eth.Contract(ERC20Token.abi)
  return web3Contract
    .deploy({
      data: ERC20Token.bytecode,
      arguments: [
        tokenName,
        tokenSymbol,
        tokenDecimals || 18,
        parseInt(tokenSupply)
      ]
    })
    .send(
      {
        from: web3.currentProvider.selectedAddress,
        gas: 1500000,
        gasPrice: web3.eth.gasPrice
      },
      function(error, transactionHash) {
        console.log(transactionHash)
      }
    )
    .on("error", function(error) {
      console.log(error)
    })
    .on("transactionHash", function(transactionHash) {
      console.log(transactionHash)
    })
    .on("receipt", function(receipt) {
      console.log(receipt.contractAddress) // contains the new contract address
    })
    .on("confirmation", function(confirmationNumber, receipt) {
      console.log(confirmationNumber)
    })
}

export const deployCrowdsale = ({
  web3,
  tokenAddress,
  walletAddress,
  tokenPrice
}) => {
  // Deploy using web3
  const web3Contract = new web3.eth.Contract(CrowdsaleSimple.abi)
  return web3Contract
    .deploy({
      data: CrowdsaleSimple.bytecode,
      arguments: [
        tokenPrice,
        walletAddress || web3.currentProvider.selectedAddress,
        tokenAddress
      ]
    })
    .send(
      {
        from: web3.currentProvider.selectedAddress,
        gas: 1500000,
        gasPrice: web3.eth.gasPrice
      },
      function(error, transactionHash) {
        console.log(transactionHash)
      }
    )
}
