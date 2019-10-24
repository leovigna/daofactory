import React from "react"
import { Button } from "reactstrap"

const WatchTokenButton = ({ web3, web3Contract }) => {
  const watchToken = async () => {
    const provider = web3.currentProvider
    const tokenAddress = web3Contract.address
    const tokenSymbol = await web3Contract.methods.symbol().call()
    const tokenDecimals = await web3Contract.methods.decimals().call()

    // const tokenImage = null;
    const params = JSON.parse(
      JSON.stringify({
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image:
            "https://cdn.pixabay.com/photo/2018/02/02/13/51/bitcoin-3125488_1280.png"
        }
      })
    )
    console.log(params)

    provider.sendAsync(
      {
        method: "metamask_watchAsset",
        params,
        id: Math.round(Math.random() * 100000)
      },
      (err, added) => {
        console.log("provider returned", err, added)
      }
    )
  }

  return <Button onClick={watchToken}>Add to Metamask</Button>
}

export default WatchTokenButton
