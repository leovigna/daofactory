import React, { useState, useContext } from "react"

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap"

import { DrizzleContext } from "@drizzle/react-plugin"
import { deployERC20 } from "../../../tokenlaunch/deploy"

const CreateToken = () => {
  const [tokenName, setTokenName] = useState()
  const [tokenSymbol, setTokenSymbol] = useState()
  const [tokenSupply, setTokenSupply] = useState()

  const drizzleContext = useContext(DrizzleContext.Context)
  const { drizzle, drizzleState, initialized } = drizzleContext
  if (!initialized) {
    return "Loading..."
  }
  if (!drizzleState) {
    return "Invalid state..."
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { web3 } = drizzle
    deployERC20({ web3, tokenName, tokenSymbol, tokenSupply }).then(function(
      newContractInstance
    ) {
      const newAddress = newContractInstance.options.address
      console.log(newAddress) // instance with the new contract address

      // Add to drizzle datastore
      const contractConfig = {
        contractName: newAddress,
        web3Contract: newContractInstance
      }
      const events = []
      drizzle.addContract(contractConfig, events)

      drizzle.store.dispatch({
        type: "ADD_CONTRACT_METADATA",
        contractName: newAddress,
        contractMetadata: { contractInterface: "ERC20" }
      })
    })
  }
  const handleChangeTokenName = e => {
    setTokenName(e.target.value)
  }
  const handleChangeTokenSymbol = e => {
    setTokenSymbol(e.target.value)
  }
  const handleChangeTokenSupply = e => {
    setTokenSupply(e.target.value)
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Token</strong> Create
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="tokenName">Token Name</Label>
                  <Input
                    type="text"
                    value={tokenName}
                    onChange={handleChangeTokenName}
                    name="tokenName"
                    id="tokenName"
                    placeholder="Enter Token Name (eg. Ethereum)"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tokenSymbol">Token Symbol</Label>
                  <Input
                    type="text"
                    value={tokenSymbol}
                    onChange={handleChangeTokenSymbol}
                    name="tokenSymbol"
                    id="tokenSymbol"
                    placeholder="Enter Token Symbol (eg. ETH)"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tokenSupply">Initial Supply</Label>
                  <Input
                    type="number"
                    value={tokenSupply}
                    onChange={handleChangeTokenSupply}
                    name="tokenSupply"
                    id="tokenSupply"
                    placeholder="Enter Initial Supply (eg. 1000)"
                  />
                </FormGroup>
                <Button>Launch</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateToken
