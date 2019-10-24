import React, { useState, useContext } from "react"

import { Row, Col, ListGroup, ListGroupItem, Badge } from "reactstrap"

import { DrizzleContext } from "@drizzle/react-plugin"
import { newContextComponents } from "@drizzle/react-components"

const { ContractData } = newContextComponents

const CrowdsaleDisplay = ({ contract }) => {
  const [crowdsaleWalletKey, setCrowdsaleWalletKey] = useState()
  const [crowdsaleTokenKey, setCrowdsaleTokenKey] = useState()
  const [crowdsaleRateKey, setCrowdsaleRateKey] = useState()

  const drizzleContext = useContext(DrizzleContext.Context)

  const { drizzle, drizzleState } = drizzleContext
  if (!drizzleState) {
    return null
  }

  const { contractMetadata } = drizzleState
  const metadata = contractMetadata[contract]
  if (metadata) {
    const { contractInterface } = metadata
    if (contractInterface !== "Crowdsale") {
      return null
    }
  }

  const web3Contract = drizzle.contracts[contract]
  if (!web3Contract) {
    return null
  }

  if (!crowdsaleWalletKey) {
    setCrowdsaleWalletKey(
      drizzle.contracts[contract].methods.wallet.cacheCall()
    )
  }
  if (!crowdsaleTokenKey) {
    setCrowdsaleTokenKey(drizzle.contracts[contract].methods.token.cacheCall())
  }
  if (!crowdsaleRateKey) {
    setCrowdsaleRateKey(drizzle.contracts[contract].methods.rate.cacheCall())
  }

  const crowdsaleWallet =
    drizzleState.contracts[contract].wallet[crowdsaleWalletKey]
  const crowdsaleRate = drizzleState.contracts[contract].rate[crowdsaleRateKey]
  const crowdsaleToken =
    drizzleState.contracts[contract].token[crowdsaleTokenKey]

  if (!crowdsaleWallet || !crowdsaleToken || !crowdsaleRate) {
    return null
  }

  const tokenName = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={crowdsaleToken.value}
      method="name"
    />
  )

  const tokenSymbol = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={crowdsaleToken.value}
      method="symbol"
    />
  )

  const totalSupply = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={crowdsaleToken.value}
      method="totalSupply"
      render={data => data * 10e-18}
    />
  )

  const walletBalance = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={crowdsaleToken.value}
      method="balanceOf"
      methodArgs={[crowdsaleWallet.value]}
      render={data => data * 10e-18}
    />
  )

  return (
    <Row>
      <Col>
        <ListGroup>
          <ListGroupItem className="justify-content-between">
            Token
            <Badge pill>
              {" "}
              {tokenName} {tokenSymbol}{" "}
            </Badge>
          </ListGroupItem>
          <ListGroupItem className="justify-content-between">
            Price
            <Badge pill>
              1 wei = {crowdsaleRate.value} {tokenSymbol}
            </Badge>
          </ListGroupItem>
          <ListGroupItem className="justify-content-between">
            Token at
            <Badge pill>{crowdsaleToken.value}</Badge>
          </ListGroupItem>
          <ListGroupItem className="justify-content-between">
            TokenSale supply
            <Badge pill>
              {walletBalance} {tokenSymbol}
            </Badge>
          </ListGroupItem>
          <ListGroupItem className="justify-content-between">
            Total supply
            <Badge pill>
              {totalSupply} {tokenSymbol}
            </Badge>
          </ListGroupItem>
          <ListGroupItem className="justify-content-between">
            Tokens stored at
            <Badge pill>{crowdsaleWallet.value}</Badge>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default CrowdsaleDisplay
