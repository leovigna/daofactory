import React, { useContext } from "react" 

import { Row, Col, ListGroup, ListGroupItem, Badge } from "reactstrap"
import { DrizzleContext } from "@drizzle/react-plugin"
import { newContextComponents } from "@drizzle/react-components"
import WatchTokenButton from "../../WatchTokenButton"

const { ContractData } = newContextComponents

const ERC20Display = ({ contract }) => {
  const drizzleContext = useContext(DrizzleContext.Context)

  const { drizzle, drizzleState } = drizzleContext
  if (!drizzleState) {
    return null
  }

  const { accounts, contractMetadata } = drizzleState
  const metadata = contractMetadata[contract]
  if (metadata) {
    const { contractInterface } = metadata
    if (contractInterface !== "ERC20") {
      return null
    }
  }

  const web3Contract = drizzle.contracts[contract]
  if (!web3Contract) {
    return null
  }

  const tokenName = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      method="name"
    />
  )

  const tokenSymbol = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      method="symbol"
    />
  )

  const totalSupply = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      method="totalSupply"
      render={data => data * 10e-18}
    />
  )

  const balance = (
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract={contract}
      method="balanceOf"
      methodArgs={[accounts[0]]}
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
              {tokenName} ({tokenSymbol})
            </Badge>
          </ListGroupItem>

          <ListGroupItem className="justify-content-between">
            Total Supply
            <Badge pill>
              {totalSupply} {tokenSymbol}
            </Badge>
          </ListGroupItem>

          <ListGroupItem className="justify-content-between">
            My Balance
            <Badge pill>
              {balance} {tokenSymbol}
            </Badge>
          </ListGroupItem>
        </ListGroup>
        <WatchTokenButton web3={drizzle.web3} web3Contract={web3Contract} />
      </Col>
    </Row>
  )
}

export default ERC20Display
